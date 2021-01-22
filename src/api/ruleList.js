import {
  service
} from '@/axios'

export const getRuleListData = () => {
  const params = {
    limit: 100,
    textSearch: ''
  }
  return service.get('/api/ruleChains', {
    params
  })
}
export const HttpAddRule = (data) => {
  return service.post('/api/ruleChain', data)
}
export const HttpUploadRule = (data) => {
  return service.post('/api/ruleChain/metadata', data)
}
export const HttpDeleteRule = (param) => {
  return service.delete('/api/ruleChain/' + param)
}
export const HttpStartRule = (url) => {
  return service.post(url)
}
export const HttpDownloadRule = async (param, name, data) => {
  const response = await service.get('/api/ruleChain/' + param + '/metadata')
  response.nodes && response.nodes.forEach((element) => {
    delete element.id
    delete element.createdTime
    delete element.ruleChainId
  })
  const RuleData = {
    ruleChain: data,
    metadata: response
  }
  const blob = new Blob([JSON.stringify(RuleData)], {
    type: 'application/json'
  })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = name + '.json'
  link.click()
}
