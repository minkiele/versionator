export namespace Versionator {

  const VSEP = '-';
  const DEFAULT_LOWER_LIMIT = 2;
  const DEFAULT_UPPER_LIMIT = 6;
  const DEFAULT_PROBABILITY = .5;

  function flipCoin(probabilityOfSuccess = DEFAULT_PROBABILITY): boolean {
    return Math.random() < probabilityOfSuccess;
  }

  function caseInput(input: string, probabilityOfSuccess = DEFAULT_PROBABILITY): string {
    return input[flipCoin(probabilityOfSuccess) ? 'toUpperCase' : 'toLowerCase']();
  }

  function getProgressive(probabilityOfSuccess = DEFAULT_PROBABILITY, lowerLimit: number = DEFAULT_LOWER_LIMIT, upperLimit: number = DEFAULT_UPPER_LIMIT): string {
    return flipCoin(probabilityOfSuccess) ? (Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit) + '' : '';
  }

  const suffixes: Array<() => string> = [
    () => caseInput('def', .333) + getProgressive(.125),
    () => caseInput('finale', .333) + getProgressive(.125),
    () => caseInput('ok', .333) + getProgressive(.125),
    () => caseInput('nuovo', .333) + getProgressive(.125),
    () => caseInput('nuova', .333) + getProgressive(.125),
    () => caseInput('draft', .333) + getProgressive(.125),
    () => caseInput('ultimo', .333) + getProgressive(.125),
    () => caseInput('ultima', .333) + getProgressive(.125),
    () => caseInput('v', .333) + getProgressive(1),
    () => caseInput('test', .333) + getProgressive(.125),
    () => caseInput('bozza', .333) + getProgressive(.125),
  ];

  function pickRandomElement<T>(elements: Array<T>): T {
    return elements[Math.floor(Math.random() * elements.length)];
  }

  export function version(input: string): string {
    const suffixFn: () => string = pickRandomElement(suffixes);
    const suffix = suffixFn();
    let output = `${input}${VSEP}${suffix}`;
    return flipCoin(.666) ? version(output) : output;
  }

}
