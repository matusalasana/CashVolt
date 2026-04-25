import LogoutButton from "../components/LogoutButton";
import SettingsHeader from "../components/settings/SettingsHeader";
import GeneralSettings from "../components/settings/GeneralSettings";
import NotificationSection from "../components/settings/NotificationSection";
import ThemeSection from "../components/settings/ThemeSection";
import DataManagementSection from "../components/settings/DataManagementSection";

const Settings = () => {
  return (
    <div className="min-h-screen bg-base-200 px-4 py-6">

      {/* Container */}
      <div className="mx-auto w-full max-w-2xl space-y-4">

        <SettingsHeader />

        {/* Sections */}
        <div className="space-y-3">
          <GeneralSettings />
          <NotificationSection />
          <ThemeSection />
          <DataManagementSection />
        </div>

        {/* Logout section */}
        <div className="pt-2">
          <LogoutButton />
        </div>

      </div>
    </div>
  );
};

export default Settings;