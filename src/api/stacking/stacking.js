import {api} from "../apiClient";

export function getPoxInfo() {
  return api.get('/stacking/pox')
}

export function getApyHistory(){
  return api.get('/stacking/apy/history')
}
