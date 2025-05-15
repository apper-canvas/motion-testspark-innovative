import { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import getIcon from '../utils/iconUtils';

const TestFlowDiagram = ({ steps }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // Icons for different step types
  const MousePointerIcon = getIcon('MousePointer');
  const KeyboardIcon = getIcon('Keyboard');
  const EyeIcon = getIcon('Eye');
  const ArrowUpRightIcon = getIcon('ArrowUpRight');
  
  // Get icon based on step type
  const getStepTypeIcon = (type) => {
    switch (type) {
      case 'click':
        return <MousePointerIcon className="text-primary" size={16} />;
      case 'input':
        return <KeyboardIcon className="text-secondary" size={16} />;
      case 'assertion':
        return <EyeIcon className="text-warning" size={16} />;
      case 'navigation':
        return <ArrowUpRightIcon className="text-accent" size={16} />;
      default:
        return <div className="w-4 h-4" />;
    }
  };
  
  // Custom node component
  const CustomNode = ({ data }) => {
    return (
      <div className={`flow-node ${data.type === 'input' ? 'flow-node-input' : ''}`}>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background-primary flex items-center justify-center">
            {data.icon}
          </div>
          <div>
            <div className="font-medium text-text-primary">{data.label}</div>
            <div className="flex space-x-2 text-xs">
              <span className="text-text-secondary">{data.stepType}</span>
              {data.target && (
                <span className="font-mono text-accent">{data.target}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Node types configuration
  const nodeTypes = {
    custom: CustomNode,
  };
  
  // Transform steps into nodes and edges
  useEffect(() => {
    if (steps.length === 0) return;
    
    const newNodes = steps.map((step, index) => ({
      id: `${step.id}`,
      type: 'custom',
      position: { x: 100, y: index * 150 },
      data: {
        label: step.description,
        stepType: step.type,
        target: step.target,
        value: step.value,
        icon: getStepTypeIcon(step.type),
        type: index === 0 ? 'input' : 'default',
      },
    }));
    
    const newEdges = [];
    
    // Create edges between nodes
    for (let i = 0; i < steps.length - 1; i++) {
      newEdges.push({
        id: `e${steps[i].id}-${steps[i+1].id}`,
        source: `${steps[i].id}`,
        target: `${steps[i+1].id}`,
        animated: true,
        style: { stroke: '#22A29F', strokeWidth: 2 },
      });
    }
    
    setNodes(newNodes);
    setEdges(newEdges);
  }, [steps, setNodes, setEdges]);
  
  return (
    <div className="flow-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background color="#161B3A" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};

export default TestFlowDiagram;