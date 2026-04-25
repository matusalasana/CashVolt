const SettingsHeader = () => {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">

      <div>
        <h1 className="text-xl font-bold text-base-content">
          Settings
        </h1>

        <p className="text-sm text-base-content/70 mt-1 max-w-md">
          Manage your financial environment and data preferences.
        </p>
      </div>

    </div>
  );
};

export default SettingsHeader;