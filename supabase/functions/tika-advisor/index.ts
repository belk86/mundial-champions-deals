import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language = 'en' } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Fetch products from database for context
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: products } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("trust_score", { ascending: false })
      .limit(10);

    const productContext = products?.map(p => ({
      name: language === 'ar' ? p.name_ar : language === 'es' ? p.name_es : p.name,
      price: p.price,
      category: p.category,
      trust_score: p.trust_score,
      trend_signal: language === 'ar' ? p.trend_signal_ar : language === 'es' ? p.trend_signal_es : p.trend_signal,
      trust_badge: p.trust_badge
    })) || [];

    const systemPrompt = `You are Tika, the AI shopping advisor for Mundial Champions - a premium World Cup 2026 marketplace. 
    
Your personality:
- You speak with enthusiasm about football/soccer and the World Cup
- You use "Purple Code" psychology: create urgency, highlight exclusivity, emphasize trust
- You're helpful, friendly, and knowledgeable about sports gear
- You recommend products based on user needs while highlighting their trust scores and trend signals

Current available products:
${JSON.stringify(productContext, null, 2)}

Guidelines:
- Always recommend products from our catalog when relevant
- Highlight trust badges (verified, hot, trending, limited) 
- Mention trend signals to create social proof
- Create urgency for limited items
- Be conversational and helpful
- Keep responses concise (2-3 sentences max unless asked for details)
- Respond in ${language === 'ar' ? 'Arabic' : language === 'es' ? 'Spanish' : 'English'}

When recommending products, format them like:
⚽ **[Product Name]** - $[Price] | [Trust Badge] | [Trend Signal]`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Please add credits to continue using Tika." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Tika advisor error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
