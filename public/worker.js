/**
 * 将规则链节点添加到节点列表
 * @param {*} ruleChainConnections 规则链间关系
 * @param {*} ruleChainOptions 所有规则链
 * @param {*} nodes 当前节点
 * @param {*} ruleChainId 当前规则链ID
 */
function _getRuleChainsOptions(ruleChainConnections, ruleChainOptions, nodes, ruleChainId, id) {
  const idArr = []
  const diffArr = []
  if (!ruleChainConnections) {
    ruleChainConnections = []
  }
  ruleChainConnections.forEach(v => {
    if (idArr.indexOf(v.additionalInfo.ruleChainNodeId) === -1) {
      idArr.push(v.additionalInfo.ruleChainNodeId)
      diffArr.push(v)
    }
  })
  ruleChainOptions.forEach((v, k) => {
    if (v.id.id === id) {
      // data.splice(k, 1)
      ruleChainOptions.splice(k, 1)
    }
  })
  diffArr.forEach(v => {
    ruleChainOptions.forEach(value => {
      if (v.targetRuleChainId.id === value.id.id) {
        nodes.push({
          additionalInfo: v.additionalInfo,
          configuration: null,
          createdTime: new Date().getTime(),
          debugMode: false,
          id: v.targetRuleChainId,
          name: value.name,
          ruleChainId,
          type: 'CHAINS'
        })
      }
    })
  })
  return nodes
}

function _getConnectionsAndSvgSize(ruleChainConnections, nodes, connections) {
  let svgWidth = 2200
  let svgHeight = 1500
  let tempWidth = 0
  let tempHeight = 0
  if (!ruleChainConnections) {
    ruleChainConnections = []
  }
  if (!connections) {
    connections = []
  }
  ruleChainConnections.forEach(v => {
    nodes.forEach((element, index) => {
      if (element.additionalInfo.ruleChainNodeId === v.additionalInfo.ruleChainNodeId) {
        connections.push({
          fromIndex: v.fromIndex,
          toIndex: index,
          type: v.type
        })
      }
    })
  })
  connections.forEach(v => {
    nodes.forEach((element) => {
      if (element.additionalInfo.layoutX > tempWidth) {
        tempWidth = element.additionalInfo.layoutX
      }
      if (element.additionalInfo.layoutY > tempHeight) {
        tempHeight = element.additionalInfo.layoutY
      }
    })
  })
  if (tempWidth || JSON.stringify(tempWidth) === '0') {
    if (tempWidth < 2200) {
      svgWidth = 2200
    } else {
      svgWidth = tempWidth + 400
    }
  }

  if (tempHeight || JSON.stringify(tempHeight) === '0') {
    if (tempHeight < 1500) {
      svgHeight = 1500
    } else {
      svgHeight = tempHeight + 400
    }
  }
  return {
    svgWidth,
    svgHeight,
    connections
  }
}

onmessage = function (e) {
  // eslint-disable-next-line no-mixed-operators
  const temp = e && e.data || {}
  const {
    ChainRelation = [], ruleChainOptions = [], id, rootNodeMakeId
  } = temp
  const {
    ruleChainConnections = [], nodes = [], ruleChainId, connections = []
  } = ChainRelation
  const _nodes = _getRuleChainsOptions(ruleChainConnections, ruleChainOptions, nodes, ruleChainId, id)

  const {
    svgWidth,
    svgHeight,
    connections: modConnects
  } = _getConnectionsAndSvgSize(ruleChainConnections, _nodes, connections) // 导出 svgWidth,svgHeight
  const standUpChainRelationData = JSON.stringify(ChainRelation) // 备份 导出 standUpChainRelationData
  const standUpRelationNodes = [..._nodes] // 备份节点 导出 standUpRelationNodes
  // 导出 ChainRelation
  let rootNodeLine
  if (!!ChainRelation.firstNodeIndex || JSON.stringify(ChainRelation.firstNodeIndex) === '0') {
    rootNodeLine = {
      fromIndex: '-1',
      toIndex: ChainRelation.firstNodeIndex,
      type: 'root'
    }
  }
  ChainRelation.connections = modConnects
  // 导出 rootNodeLine
  const rootNodeData = {
    additionalInfo: {
      layoutX: 100,
      layoutY: 50
    },
    configuration: null,
    createdTime: 0,
    id: {
      id: rootNodeMakeId,
      entityType: 'RULE_NODE'
    },
    debugMode: false,
    name: 'Input',
    type: 'INPUT',
    ruleChainId
  }
  postMessage({
    svgWidth,
    svgHeight,
    standUpChainRelationData,
    standUpRelationNodes,
    rootNodeLine,
    ChainRelation,
    rootNodeData
  })
}
