import {
  service
} from '@/axios'

export const GetChainData = (id) => {
  return service.get('/api/ruleChain/' + id + '/metadata')
}
export const HttpGetRuleListData = () => {
  const params = {
    limit: 20,
    textSearch: ''
  }
  return service.get('/api/ruleChains', {
    params
  })
}
export const GetRuleListData = () => {
  const params = {
    limit: 100,
    textSearch: ''
  }
  return service.get('/api/ruleChains', {
    params
  })
}
export const GetTenantData = (url) => {
  const params = {
    limit: 50,
    textSearch: ''
  }
  return service.get('/api' + url, {
    params
  })
}
export const GetDeviceTypes = () => {
  return service.get('/api/device/types')
}
export const GetData = (params, id, type) => {
  return service.get(`/api/events/RULE_NODE/${id}/` + type, {
    params
  })
}
export const GetListData = () => {
  return service.get('/api/components?componentTypes=FILTER,ENRICHMENT,TRANSFORMATION,ACTION,EXTERNAL')
}
export const GetInitData = (id) => {
  return service.get('/api/ruleChain/' + id)
}
export const HttpUploadRule = (data) => {
  return service.post('/api/ruleChain/metadata', data)
}
export const HttpTestJscript = (data) => {
  return service.post('/api/ruleChain/testScript', data)
}
