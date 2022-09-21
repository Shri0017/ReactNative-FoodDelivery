import { ApiConstant } from "../constants";

const getFlagIcon = (code) => `${ApiConstant.COUNTRY_FLAG.BASE_URL}/${code}`;
export default {getFlagIcon}