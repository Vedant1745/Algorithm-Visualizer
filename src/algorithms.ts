// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Bubble Sort
export const bubbleSort = async (
  arr: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  setCurrentStep: (step: string) => void,
  setCurrentIndices: (indices: number[]) => void
) => {
  const array = [...arr];
  const n = array.length;

  setCurrentStep('Bubble Sort: Compare adjacent numbers and swap if they are in the wrong order');
  await delay(speed);

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      setCurrentIndices([j, j + 1]);
      setCurrentStep(`Comparing ${array[j]} and ${array[j + 1]}`);
      await delay(speed);
      
      if (array[j] > array[j + 1]) {
        setCurrentStep(`${array[j]} is greater than ${array[j + 1]}, swapping them`);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        setArray([...array]);
        await delay(speed);
      }
    }
    setCurrentStep(`${array[n - i - 1]} is now in its correct position`);
    await delay(speed);
  }
  setCurrentIndices([]);
};

// Quick Sort
export const quickSort = async (
  arr: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  setCurrentStep: (step: string) => void,
  setCurrentIndices: (indices: number[]) => void
) => {
  const array = [...arr];

  setCurrentStep('Quick Sort: Choose a pivot and partition the array around it');
  await delay(speed);

  const partition = async (low: number, high: number) => {
    const pivot = array[high];
    setCurrentStep(`Choosing ${pivot} as pivot`);
    setCurrentIndices([high]);
    await delay(speed);
    
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setCurrentStep(`Comparing ${array[j]} with pivot ${pivot}`);
      setCurrentIndices([j, high]);
      await delay(speed);
      
      if (array[j] < pivot) {
        i++;
        setCurrentStep(`${array[j]} is less than pivot ${pivot}, moving it to the left side`);
        [array[i], array[j]] = [array[j], array[i]];
        setArray([...array]);
        await delay(speed);
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    setArray([...array]);
    setCurrentStep(`Placing pivot ${pivot} in its correct position`);
    await delay(speed);
    return i + 1;
  };

  const quickSortHelper = async (low: number, high: number) => {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    }
  };

  await quickSortHelper(0, array.length - 1);
  setCurrentIndices([]);
};

// Merge Sort
export const mergeSort = async (
  arr: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  setCurrentStep: (step: string) => void,
  setCurrentIndices: (indices: number[]) => void
) => {
  const array = [...arr];

  setCurrentStep('Merge Sort: Divide the array into smaller parts and merge them in sorted order');
  await delay(speed);

  const merge = async (left: number, mid: number, right: number) => {
    setCurrentStep(`Merging subarrays from index ${left} to ${right}`);
    setCurrentIndices([left, mid, right]);
    await delay(speed);
    
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = array.slice(left, mid + 1);
    const R = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      setCurrentStep(`Comparing ${L[i]} and ${R[j]}`);
      setCurrentIndices([left + i, mid + 1 + j]);
      await delay(speed);
      
      if (L[i] <= R[j]) {
        array[k] = L[i];
        setCurrentStep(`Placing ${L[i]} in position ${k}`);
        i++;
      } else {
        array[k] = R[j];
        setCurrentStep(`Placing ${R[j]} in position ${k}`);
        j++;
      }
      setArray([...array]);
      await delay(speed);
      k++;
    }

    while (i < n1) {
      array[k] = L[i];
      setCurrentStep(`Placing remaining element ${L[i]} in position ${k}`);
      setCurrentIndices([k]);
      setArray([...array]);
      await delay(speed);
      i++;
      k++;
    }

    while (j < n2) {
      array[k] = R[j];
      setCurrentStep(`Placing remaining element ${R[j]} in position ${k}`);
      setCurrentIndices([k]);
      setArray([...array]);
      await delay(speed);
      j++;
      k++;
    }
  };

  const mergeSortHelper = async (left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      setCurrentStep(`Dividing array at position ${mid}`);
      setCurrentIndices([left, mid, right]);
      await delay(speed);
      await mergeSortHelper(left, mid);
      await mergeSortHelper(mid + 1, right);
      await merge(left, mid, right);
    }
  };

  await mergeSortHelper(0, array.length - 1);
  setCurrentIndices([]);
};