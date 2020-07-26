import { LicenseManager } from 'ag-grid-enterprise';

const setAgGridLicense = key => {
    LicenseManager.setLicenseKey(key);
};

export default setAgGridLicense;
