onmessage = function (event) {
  const { ChainRelationList, standUpRelationNodes } = event.data || {}
  const templeteData = JSON.stringify(ChainRelationList)
  const data = JSON.parse(templeteData)
  data.nodes = standUpRelationNodes
  const handleTypeData = []
  !data.connections && (data.connections = [])
  data.connections.forEach(v => {
    const splitArr = v.type.split(' / ')
    if (splitArr.length > 1) {
      splitArr.forEach(value => {
        handleTypeData.push({
          fromIndex: v.fromIndex,
          toIndex: v.toIndex,
          type: value
        })
      })
    } else {
      handleTypeData.push(v)
    }
  })
  data.connections = handleTypeData
  !data.nodes && (data.nodes = [])
  if (data.nodes.length - 1 < data.firstNodeIndex) {
    data.firstNodeIndex = null
  }
  const filterNodes = []
  const filterNodesIndex = []
  const filterConnections = []
  // const dataLength = data.nodes.length

  data.nodes.forEach((v, k) => {
    if (v.type === 'CHAINS') {
      filterNodes.push({
        value: v,
        index: k
      })
      filterNodesIndex.push(k)
    }
  })

  const indexArr = []
  data.connections.forEach((v, k) => {
    filterNodes.forEach((element, key) => {
      if (v.toIndex === element.index) {
        element.value.additionalInfo.ruleChainNodeId = 'rule-chain-node-' + (element.index + 2)
        filterConnections.push({
          element,
          connect: v
        })
        indexArr.push(k)
      }
    })
  })
  indexArr.reverse().forEach(v => {
    data.connections.forEach((value, k) => {
      if (v === k) {
        data.connections.splice(k, 1)
      }
    })
  })
  const ruleChainConnections = []
  filterConnections.map(v => {
    ruleChainConnections.push({
      additionalInfo: v.element.value.additionalInfo,
      fromIndex: v.connect.fromIndex,
      targetRuleChainId: v.element.value.originalData ? v.element.value.originalData.id : v.element.value.id,
      type: v.connect.type
    })
  })
  if (filterNodesIndex.length) {
    filterNodesIndex.reverse().forEach(v => {
      data.nodes.splice(v, 1)
    })
    filterNodesIndex.forEach((v, k) => {
      data.connections.forEach(value => {
        if (value.fromIndex > v) {
          --value.fromIndex
        }
        if (value.toIndex > v) {
          --value.toIndex
        }
      })
    })
    // 处理乱序插入规则链Bug
    filterNodesIndex.forEach((v, k) => {
      ruleChainConnections.forEach(value => {
        if (value.fromIndex > v) {
          --value.fromIndex
        }
      })
    })
  }
  data.ruleChainConnections = ruleChainConnections
  postMessage({ data })
}
