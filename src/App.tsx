import React, { useState } from 'react';
import { Play, Pause, Plus, Trash, ArrowRight } from 'lucide-react';
import { bubbleSort, quickSort, mergeSort } from './algorithms';
import { LinkedList } from './linkedList';

type Algorithm = 'bubble' | 'quick' | 'merge' | 'linkedlist';

function App() {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState<Algorithm>('linkedlist');
  const [speed, setSpeed] = useState(1500);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState('');
  const [linkedList] = useState(new LinkedList());
  const [nodeValue, setNodeValue] = useState('');
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);

  const parseInput = (input: string): number[] => {
    return input.split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const numbers = parseInput(inputValue);
    if (numbers.length > 0) {
      setArray(numbers);
      setCurrentStep('Array loaded! Click Start to begin sorting.');
    }
  };

  const startSorting = async () => {
    setSorting(true);
    switch (algorithm) {
      case 'bubble':
        await bubbleSort(array, setArray, speed, setCurrentStep, setCurrentIndices);
        break;
      case 'quick':
        await quickSort(array, setArray, speed, setCurrentStep, setCurrentIndices);
        break;
      case 'merge':
        await mergeSort(array, setArray, speed, setCurrentStep, setCurrentIndices);
        break;
    }
    setSorting(false);
    setCurrentStep('Sorting completed!');
    setCurrentIndices([]);
  };

  const handleAddNode = (position: 'head' | 'tail') => {
    const value = parseInt(nodeValue);
    if (!isNaN(value)) {
      if (position === 'head') {
        linkedList.insertAtHead(value);
      } else {
        linkedList.insertAtTail(value);
      }
      setNodeValue('');
      setCurrentStep(`Added ${value} at ${position}`);
    }
  };

  const handleDeleteNode = () => {
    const value = parseInt(nodeValue);
    if (!isNaN(value)) {
      linkedList.deleteNode(value);
      setNodeValue('');
      setCurrentStep(`Deleted node with value ${value}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Algorithm Visualizer
          </h1>

          {/* Algorithm Selection */}
          <div className="mb-8">
            <select
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
              disabled={sorting}
            >
              <option value="linkedlist">Linked List</option>
              <option value="bubble">Bubble Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="merge">Merge Sort</option>
            </select>
          </div>

          {algorithm === 'linkedlist' ? (
            <>
              {/* Linked List Controls */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-4">
                  <input
                    type="number"
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    value={nodeValue}
                    onChange={(e) => setNodeValue(e.target.value)}
                    placeholder="Enter a number"
                  />
                  <button
                    className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    onClick={() => handleAddNode('head')}
                  >
                    <Plus className="w-5 h-5" />
                    Add at Start
                  </button>
                  <button
                    className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => handleAddNode('tail')}
                  >
                    <Plus className="w-5 h-5" />
                    Add at End
                  </button>
                  <button
                    className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    onClick={handleDeleteNode}
                  >
                    <Trash className="w-5 h-5" />
                    Delete
                  </button>
                </div>
              </div>

              {/* Linked List Visualization */}
              <div className="overflow-x-auto bg-gray-50 rounded-xl p-8">
                <div className="flex items-center gap-4 min-w-max">
                  {linkedList.getNodes().map((node, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full border-4 border-blue-500 shadow-lg transform transition-transform hover:scale-110">
                        <span className="text-2xl font-bold text-blue-600">{node.value}</span>
                      </div>
                      {index < linkedList.getNodes().length - 1 && (
                        <ArrowRight className="w-10 h-10 text-blue-500 mx-2" />
                      )}
                    </div>
                  ))}
                  {linkedList.getNodes().length === 0 && (
                    <div className="text-gray-500 text-lg">Empty list - Add some numbers!</div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Sorting Controls */}
              <div className="mb-8">
                <div className="flex flex-col gap-4">
                  <textarea
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter numbers separated by commas (e.g., 5, 2, 8, 1, 9)"
                    rows={2}
                    disabled={sorting}
                  />
                  <div className="flex gap-4">
                    <button
                      className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                      onClick={handleSubmit}
                      disabled={sorting || !inputValue.trim()}
                    >
                      Load Numbers
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                      onClick={sorting ? () => {} : startSorting}
                      disabled={sorting || array.length === 0}
                    >
                      {sorting ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      {sorting ? 'Sorting...' : 'Start Sorting'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Array Visualization */}
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center justify-center gap-4 min-h-[200px]">
                  {array.map((value, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-center w-16 h-16 rounded-lg text-xl font-bold transition-all duration-300 transform ${
                        currentIndices.includes(idx)
                          ? 'bg-yellow-200 border-4 border-yellow-400 scale-110'
                          : 'bg-blue-100 border-4 border-blue-400'
                      }`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Current Step Explanation */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">What's happening?</h2>
            <p className="text-blue-700 text-lg">{currentStep}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
