import { useState } from 'react';
import { AnalysisResult } from '../types';
import { supabase } from '../lib/supabaseClient';

export const useStockAnalysis = () => {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const analyze = async (symbol: string, period: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: analysisData, error: analysisError } = await supabase
        .rpc('analyze_stock', {
          p_symbol: symbol,
          p_period: period
        });

      if (analysisError) throw new Error(analysisError.message);
      if (!analysisData) throw new Error('No analysis data received');

      setData(analysisData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, analyze };
};