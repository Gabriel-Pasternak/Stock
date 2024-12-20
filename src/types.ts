export interface AnalysisResult {
  current_price: number;
  sma_20: number;
  sma_50: number;
  rsi: number;
  predicted_price: number;
  model_accuracy: number;
  recommendation: string;
  reasoning: string;
}