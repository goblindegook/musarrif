declare module 'piper-wasm' {
  export function piperGenerate(
    phonemizeJsUrl: string,
    phonemizeWasmUrl: string,
    phonemizeDataUrl: string,
    workerUrl: string,
    modelUrl: string,
    modelConfigUrl: string,
    speakerId: number | null,
    input: string,
    onProgress: ((progress: number) => void) | null,
    phonemeIds: number[] | null,
    inferEmotion: boolean,
    onnxruntimeUrl?: string,
    expressionWorkerUrl?: string,
  ): Promise<{ file: string }>
}
