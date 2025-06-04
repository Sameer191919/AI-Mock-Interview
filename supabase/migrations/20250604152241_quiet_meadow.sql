/*
  # Create interviews and expressions tables

  1. New Tables
    - `interviews`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `role` (text)
      - `date` (timestamptz)
      - `duration` (integer)
      - `score` (integer)
      - `created_at` (timestamptz)
    
    - `expressions`
      - `id` (uuid, primary key)
      - `interview_id` (uuid, references interviews)
      - `expression` (text)
      - `timestamp` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create interviews table
CREATE TABLE IF NOT EXISTS interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role text NOT NULL,
  date timestamptz NOT NULL DEFAULT now(),
  duration integer NOT NULL,
  score integer,
  created_at timestamptz DEFAULT now()
);

-- Create expressions table
CREATE TABLE IF NOT EXISTS expressions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id uuid REFERENCES interviews NOT NULL,
  expression text NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE expressions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own interviews"
  ON interviews
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interviews"
  ON interviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own expressions"
  ON expressions
  FOR SELECT
  TO authenticated
  USING (
    interview_id IN (
      SELECT id FROM interviews WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own expressions"
  ON expressions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    interview_id IN (
      SELECT id FROM interviews WHERE user_id = auth.uid()
    )
  );