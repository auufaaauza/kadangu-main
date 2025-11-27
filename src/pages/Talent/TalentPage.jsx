import React, { useState } from "react";
import { TALENT_DATA } from "@/data/talentData";
import { TALENT_NICHES } from "@/data/talentMeta";
import { TalentCard } from "@/components/talent/TalentCard";
import { TalentFilter } from "@/components/talent/TalentFilter";
import { motion } from "framer-motion";

export default function TalentPage() {
  const [platform, setPlatform] = useState(null);
  const [niche, setNiche] = useState(null);
  const [search, setSearch] = useState("");

  const filteredTalent = TALENT_DATA.filter((t) => {
    const matchPlatform = platform ? t.category === platform : true;
    const matchNiche = niche ? t.niche === niche : true;

    const s = search.toLowerCase();
    const matchSearch =
      t.name.toLowerCase().includes(s) ||
      t.niche.toLowerCase().includes(s) ||
      t.category.toLowerCase().includes(s) ||
      t.description.toLowerCase().includes(s);

    return matchPlatform && matchNiche && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-primary/10 blur-3xl opacity-30 rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 blur-3xl opacity-30 rounded-full" />

      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-4"
          >
            Talent & Influencer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto mb-10"
          >
            Temukan creator terbaik Garut untuk kolaborasi UMKM, event, dan brand campaign.
          </motion.p>

          {/* SEARCH BAR */}
          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="Cari talent berdasarkan nama, niche, atau platform..."
              className="
                w-full sm:w-2/3 lg:w-1/2
                p-3 px-4 rounded-xl border bg-card shadow-sm
                text-sm 
                focus:outline-none focus:ring-2 focus:ring-primary/50
              "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* FILTER SECTION */}
          <TalentFilter
            platform={platform}
            setPlatform={setPlatform}
            niche={niche}
            setNiche={setNiche}
            niches={TALENT_NICHES}
          />

          {/* TALENT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {filteredTalent.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TalentCard talent={t} />
              </motion.div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredTalent.length === 0 && (
            <div className="mt-16 text-lg text-muted-foreground">
              Tidak ada talent sesuai pencarian & filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
