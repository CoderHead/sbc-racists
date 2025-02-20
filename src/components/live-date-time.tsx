'use client';

import { useState, useEffect, useMemo } from "react";
import { clearInterval, setInterval } from "timers";

const LiveDateTime = () => {
    const [time, setTime] = useState<Date>(new Date());
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formattedDate = useMemo(() => {
        if (!mounted) return '';
        const year = time.getFullYear().toString();
        const month = time.getMonth().toString().padStart(2, '0');
        const day = time.getDay().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }, [time, mounted]);

    const formattedTime = useMemo<string>(() => {
        if (!mounted) return '';
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }, [time, mounted]);

    return `${formattedDate} ${formattedTime}`;
}

export default LiveDateTime;
