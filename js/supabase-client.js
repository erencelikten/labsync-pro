// LabSync Pro — Supabase Client & Sync Layer

const SUPABASE_URL = 'https://rgqjkuuuukvhzwfuyxfcb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJncWprdXV1a3ZoendmdXl4ZmNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MzExNTEsImV4cCI6MjA4NTQwNzE1MX0.DS5c2qF_Mt2f-JF6FgzBfMwQJOIXfjx1QdQ1Z_GCVdE';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function mapToSnakeCase(obj) {
    const res = {};
    for (const key in obj) {
        const snake = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

        // Supabase Numeric types don't accept empty strings nicely, map them to null
        let val = obj[key];
        if (val === '') val = null;

        res[snake] = val;
    }
    return res;
}

function mapToCamelCase(obj) {
    const res = {};
    for (const key in obj) {
        if (key === 'created_at' || key === 'updated_at') continue;
        const camel = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        res[camel] = obj[key] === null ? '' : obj[key];
    }
    return res;
}

window.loadFromSupabase = async function () {
    try {
        const [patientsRes, semenRes, ivfRes, labRes, dnaRes] = await Promise.all([
            supabase.from('patients').select('*'),
            supabase.from('semen_tests').select('*'),
            supabase.from('ivf_records').select('*'),
            supabase.from('lab_tests').select('*'),
            supabase.from('dna_tests').select('*')
        ]);

        const newDB = {
            patients: patientsRes.data ? patientsRes.data.map(mapToCamelCase) : [],
            semenTests: semenRes.data ? semenRes.data.map(mapToCamelCase) : [],
            ivfRecords: ivfRes.data ? ivfRes.data.map(mapToCamelCase) : [],
            labTests: labRes.data ? labRes.data.map(mapToCamelCase) : [],
            dnaTests: dnaRes.data ? dnaRes.data.map(mapToCamelCase) : []
        };
        return newDB;
    } catch (err) {
        console.error("Supabase fetch failed", err);
        return null;
    }
};

window.syncToSupabase = async function () {
    if (!window.DB) return;

    try {
        // 1. Upsert Patients first (foreign key dependency)
        if (DB.patients && DB.patients.length > 0) {
            await supabase.from('patients').upsert(DB.patients.map(mapToSnakeCase));
        }

        // 2. Upsert others concurrently
        const tasks = [];
        if (DB.semenTests && DB.semenTests.length > 0) {
            tasks.push(supabase.from('semen_tests').upsert(DB.semenTests.map(mapToSnakeCase)));
        }
        if (DB.ivfRecords && DB.ivfRecords.length > 0) {
            tasks.push(supabase.from('ivf_records').upsert(DB.ivfRecords.map(mapToSnakeCase)));
        }
        if (DB.labTests && DB.labTests.length > 0) {
            tasks.push(supabase.from('lab_tests').upsert(DB.labTests.map(mapToSnakeCase)));
        }
        if (DB.dnaTests && DB.dnaTests.length > 0) {
            tasks.push(supabase.from('dna_tests').upsert(DB.dnaTests.map(mapToSnakeCase)));
        }

        await Promise.all(tasks);
    } catch (err) {
        console.error("Supabase sync failed", err);
    }
};

window.deleteFromSupabase = async function (table, id) {
    try {
        await supabase.from(table).delete().eq('id', id);
    } catch (err) {
        console.error(`Supabase delete failed on ${table}:`, err);
    }
};

// Expose for portal usage if needed
window.supabaseAPI = supabase;
