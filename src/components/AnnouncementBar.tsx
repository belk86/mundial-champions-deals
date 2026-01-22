import { useTranslation } from 'react-i18next';

const AnnouncementBar = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gold text-primary-foreground py-2 px-4 text-center text-sm font-medium">
      <span className="inline-flex items-center gap-2">
        ⚽ Exclusive 2026 Gear Launch | Free Shipping on Orders Over $100 | Arabic/Spanish/English Support Active
      </span>
    </div>
  );
};

export default AnnouncementBar;
