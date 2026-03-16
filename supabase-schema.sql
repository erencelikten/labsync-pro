-- ═══════════════════════════════════════════════════
-- LabSync Pro — Supabase Database Schema
-- Run these commands in the Supabase SQL Editor
-- ═══════════════════════════════════════════════════

-- 1. Create Patients Table
CREATE TABLE IF NOT EXISTS public.patients (
    id TEXT PRIMARY KEY,
    tc TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birth_date DATE,
    gender TEXT,
    blood_type TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Semen Tests Table
CREATE TABLE IF NOT EXISTS public.semen_tests (
    id TEXT PRIMARY KEY,
    patient_id TEXT REFERENCES public.patients(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    volume NUMERIC,
    concentration NUMERIC,
    progressive_motility NUMERIC,
    total_motility NUMERIC,
    morphology NUMERIC,
    vitality NUMERIC,
    leukocytes NUMERIC,
    ph NUMERIC,
    appearance TEXT,
    liquefaction TEXT,
    viscosity TEXT,
    result TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create IVF Records Table
CREATE TABLE IF NOT EXISTS public.ivf_records (
    id TEXT PRIMARY KEY,
    patient_id TEXT REFERENCES public.patients(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    protocol TEXT,
    method TEXT,
    oocyte_count INTEGER,
    mature_oocyte INTEGER,
    fertilized INTEGER,
    fert_rate NUMERIC,
    blast_count INTEGER,
    transfer_count INTEGER,
    frozen_count INTEGER,
    status TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Lab Tests Table
CREATE TABLE IF NOT EXISTS public.lab_tests (
    id TEXT PRIMARY KEY,
    patient_id TEXT REFERENCES public.patients(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    test_type TEXT,
    status TEXT,
    notes TEXT,
    parameters JSONB DEFAULT '[]'::JSONB,
    flag_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create DNA Tests Table
CREATE TABLE IF NOT EXISTS public.dna_tests (
    id TEXT PRIMARY KEY,
    patient_id TEXT REFERENCES public.patients(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    test_label TEXT,
    lab TEXT,
    overall_result TEXT,
    notes TEXT,
    parameters JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════
-- Setup Row Level Security (RLS)
-- ═══════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.semen_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ivf_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dna_tests ENABLE ROW LEVEL SECURITY;

-- Anonymous users (Patient Portal) can only read their own data
-- For now, since login is just TC+Name or QR code (no auth user session), 
-- we will create a policy to allow public read access, but they still need to know IDs.
-- In a real production system, this should be tied to authenticated Supabase Users.
CREATE POLICY "Allow public read access to patients" ON public.patients FOR SELECT USING (true);
CREATE POLICY "Allow public read access to semen_tests" ON public.semen_tests FOR SELECT USING (true);
CREATE POLICY "Allow public read access to ivf_records" ON public.ivf_records FOR SELECT USING (true);
CREATE POLICY "Allow public read access to lab_tests" ON public.lab_tests FOR SELECT USING (true);
CREATE POLICY "Allow public read access to dna_tests" ON public.dna_tests FOR SELECT USING (true);

-- Allow public insert/update/delete for the internal LabSync desktop app 
-- (Assuming it's running via static hosting without login for now)
-- ⚠️ WARNING: In production, these should be restricted to authenticated doctors/admins only.
CREATE POLICY "Allow public write access to patients" ON public.patients FOR ALL USING (true);
CREATE POLICY "Allow public write access to semen_tests" ON public.semen_tests FOR ALL USING (true);
CREATE POLICY "Allow public write access to ivf_records" ON public.ivf_records FOR ALL USING (true);
CREATE POLICY "Allow public write access to lab_tests" ON public.lab_tests FOR ALL USING (true);
CREATE POLICY "Allow public write access to dna_tests" ON public.dna_tests FOR ALL USING (true);
