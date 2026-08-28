-- Idempotent seed matching the current public product inventory and the
-- retained migration/reference CMS records.
--
-- Products are kept in sync with src/data/products.ts.
-- Projects intentionally retain legacy client records in Supabase seed data even
-- though src/data/projects.ts stays empty and the public portfolio filters these
-- slugs until ownership/contribution is verified.

insert into public.projects (
  slug, title, project_kind, client, category, year, short_description, description,
  services, roles, technologies, featured, sort_order, overview, challenge, approach,
  solution, outcome, next_project_slug, publish_status, published_at
)
values
  (
    'ardana-perkasa-group', 'Ardana Perkasa Group', 'client', 'Ardana Perkasa Group',
    'Corporate Website', 2026,
    'Modern corporate website showcasing business portfolio and services.',
    'A comprehensive corporate website built for Ardana Perkasa Group, designed to present the company, its ecosystem and services in a clear, modern digital format.',
    array['Web Design', 'Web Development', 'Content Strategy', 'SEO Optimization'],
    array['UI Design', 'Frontend Development', 'Responsive Implementation'],
    array['Next.js', 'TypeScript', 'Tailwind CSS'], true, 0,
    'Ardana Perkasa Group required a clearer digital presence capable of presenting the company, its business ecosystem and key information in a modern and structured format. The previous website no longer reflected the scale and professionalism of the organization.',
    'The existing website lacked structure and visual clarity. Key company information was difficult to find, the layout was not responsive, and the overall presentation did not match the professional image of the business group.',
    'We started by mapping the information architecture to ensure every section of the company ecosystem had a clear place. The visual direction was built around typographic hierarchy, professional spacing, and a clean layout system that works consistently across all screen sizes.',
    'The result is a fully responsive corporate website with clear information hierarchy, modern visual language, and structured content sections for each business unit. The design system uses reusable interface components that make future content updates straightforward.',
    'The final website provides a clearer, more responsive digital presence that makes company information easier to explore across desktop and mobile. The structured layout allows the team to update content without breaking the overall design.',
    'prada-badminton-club', 'published', timestamptz '2026-01-01 00:00:00+00'
  ),
  (
    'prada-badminton-club', 'Prada Badminton Club', 'client', 'Prada Badminton Club',
    'Community Website', 2025,
    'Engaging community platform for badminton club members and enthusiasts.',
    'A community-focused website designed for Prada Badminton Club, making club information, schedules and activities accessible to members and visitors.',
    array['Web Design', 'Web Development', 'UI/UX Design', 'Responsive Design'],
    array['UI/UX Design', 'Frontend Development'],
    array['Next.js', 'TypeScript', 'Tailwind CSS'], true, 1,
    'Prada Badminton Club needed a dedicated online presence to share club information, training schedules, and community updates with both existing members and potential new members.',
    'The club relied on social media and messaging groups for all communication. There was no central place for members to find schedules, event details, or club information, which created confusion and made the club less visible to new members.',
    'We designed around the key information members actually need: schedules, location, contact details, and community updates. The interface prioritizes simplicity and mobile usability since most members access information from their phones.',
    'A clean, mobile-first community website with dedicated sections for club information, training schedules, and contact. The design uses a warm, energetic visual direction that reflects the club culture while maintaining clarity and usability.',
    'The website gives the club a professional digital identity and a central hub for member communication. Key information is now easy to find, and the club has a shareable link that represents them beyond social media.',
    'ardana-perkasa-group', 'published', timestamptz '2025-01-01 00:00:00+00'
  )
on conflict (slug) do update set
  title = excluded.title, project_kind = excluded.project_kind, client = excluded.client,
  category = excluded.category, year = excluded.year,
  short_description = excluded.short_description, description = excluded.description,
  services = excluded.services, roles = excluded.roles, technologies = excluded.technologies,
  featured = excluded.featured, sort_order = excluded.sort_order, overview = excluded.overview,
  challenge = excluded.challenge, approach = excluded.approach, solution = excluded.solution,
  outcome = excluded.outcome, next_project_slug = excluded.next_project_slug,
  publish_status = excluded.publish_status, published_at = excluded.published_at;

insert into public.products (
  slug, title, category, short_description, availability_status, publish_status,
  featured, sort_order, published_at
)
values
  ('bitmind-moments', 'BITMIND Moments', 'Digital Experience',
   'Beautiful digital experiences for life''s meaningful moments. A privacy-safe umbrella for weddings, birthdays, anniversaries, and celebrations.',
   'coming-soon', 'published', true, 0, timestamptz '2026-01-01 00:00:00+00'),
  ('moneara', 'Moneara', 'Financial Product',
   'A BITMIND-owned personal finance product direction designed for calmer money management and clearer daily decisions.',
   'coming-soon', 'published', true, 1, timestamptz '2026-01-01 00:00:00+00')
on conflict (slug) do update set
  title = excluded.title, category = excluded.category,
  short_description = excluded.short_description,
  availability_status = excluded.availability_status,
  publish_status = excluded.publish_status, featured = excluded.featured,
  sort_order = excluded.sort_order, published_at = excluded.published_at;
