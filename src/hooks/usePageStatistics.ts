import { useEffect, useState } from 'react';
import { fetchStatistics, type Statistic } from '../services/api';

type FallbackStat = {
    number: string;
    description: string;
};

type UsePageStatisticsResult = {
    stats: Statistic[] | FallbackStat[];
    loading: boolean;
    error: string | null;
};

const usePageStatistics = (pageKey: string, fallback: FallbackStat[]): UsePageStatisticsResult => {
    const [stats, setStats] = useState<Statistic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStats = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchStatistics(pageKey);
                setStats(data);
            } catch (err) {
                setError('Failed to load statistics');
                console.error('Error loading statistics:', err);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, [pageKey]);

    const displayStats = stats.length > 0 ? stats : fallback;

    return { stats: displayStats, loading, error };
};

export default usePageStatistics;
