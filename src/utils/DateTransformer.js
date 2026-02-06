export default class DateTransformer {
    static zuluToDate(zuluString) {
        if (!zuluString) return null;
        const date = new Date(zuluString);
        return isNaN(date.getTime()) ? null : date;
    }

    static localToZulu(dateStr, timeStr) {
        if (!dateStr || !timeStr) return null;
        const [y, m, d] = dateStr.split('-').map(Number);
        const [hh, mm] = timeStr.split(':').map(Number);

        const localDate = new Date(y, m - 1, d, hh, mm);
        return localDate.toISOString();
    }

    static toISODate(zuluStr) {
        if (!zuluStr) return '';
        const date = new Date(zuluStr);
        if (isNaN(date.getTime())) return '';

        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');

        return `${y}-${m}-${d}`;
    }

    static toHuman(date, options = {}) {
        const d = date instanceof Date ? date : new Date(date);
        if (isNaN(d.getTime())) return '';

        const defaultOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            ...options
        };

        return new Intl.DateTimeFormat(undefined, defaultOptions).format(d);
    }
}
