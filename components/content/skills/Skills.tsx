"use client"

import Image from 'next/image'

import { motion } from 'framer-motion'

import Marquee from 'react-fast-marquee'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import LetterGlitch from '@/components/ui/LetterGlitch';

export default function TechSkills({ techSkillsData, skillsData }: { techSkillsData: TechSkill[]; skillsData: SkillContent[] }) {
    return (
        <section className='py-10 xl:py-20'>
            <div className="container space-y-10 xl:space-y-15 px-4 xl:px-10">
                <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-5 xl:gap-20">
                    <div className="flex flex-col gap-2">
                        {(() => {
                            const newestId = [...skillsData]
                                .sort((a, b) => {
                                    const ad = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                                    const bd = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                                    return bd - ad;
                                })[0]?._id ?? skillsData[skillsData.length - 1]?._id;

                            return skillsData.map((item, idx) => {
                                const defaultValue = item._id === newestId ? `${item._id ?? idx}-0` : undefined;

                                return (
                                    <div key={item._id ?? idx} className="mb-6">
                                        <motion.h3
                                            className="text-[10px] md:text-xs text-muted-foreground/80 tracking-widest mb-1 uppercase font-medium"
                                            initial={{ opacity: 0, y: 12 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                            viewport={{ once: true }}
                                        >
                                            {item.title}
                                        </motion.h3>

                                        <motion.h2
                                            className="text-lg md:text-4xl font-bold tracking-tight leading-snug mb-4"
                                            initial={{ opacity: 0, y: 16 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                                            viewport={{ once: true }}
                                        >
                                            {item.text}
                                        </motion.h2>

                                        <Accordion
                                            type="single"
                                            collapsible
                                            defaultValue={defaultValue}
                                            className="w-full space-y-2"
                                        >
                                            {item.skills.map((skill, sidx) => (
                                                <motion.div
                                                    key={`${item._id ?? idx}-${sidx}`}
                                                    initial={{ opacity: 0, y: 12 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.45, ease: 'easeOut', delay: sidx * 0.05 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <AccordionItem
                                                        value={`${item._id ?? idx}-${sidx}`}
                                                        className="rounded-lg border bg-muted/30 px-3 md:px-4"
                                                    >
                                                        <AccordionTrigger className="text-base font-medium py-3 md:py-4 hover:no-underline">
                                                            {skill.title}
                                                        </AccordionTrigger>
                                                        <AccordionContent className="text-base text-muted-foreground">
                                                            <p className="leading-relaxed">
                                                                {skill.description}
                                                            </p>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </motion.div>
                                            ))}
                                        </Accordion>
                                    </div>
                                );
                            });
                        })()}

                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <LetterGlitch
                            glitchSpeed={50}
                            centerVignette={true}
                            outerVignette={false}
                            smooth={true}
                            glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
                            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
                        />
                    </motion.div>

                </div>

                <div className="relative w-full overflow-hidden">
                    {/* Left fade overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-40 bg-linear-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />

                    {/* Right fade overlay */}
                    <div className="absolute right-0 top-0 bottom-0 w-40 bg-linear-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    >
                        <Marquee
                            speed={30}
                            gradient={false}
                            direction="left"
                            pauseOnHover={true}
                            loop={0}
                            autoFill={true}
                            className="py-4"
                        >
                            {techSkillsData.map((skill, index) => (
                                <div key={`${skill._id}-${index}`} className="flex items-center gap-2 ml-10 mr-10">
                                    <Image
                                        src={skill.imageUrl}
                                        alt={skill.title}
                                        width={50}
                                        height={50}
                                    />

                                    <span className="text-sm font-semibold">{skill.title}</span>
                                </div>
                            ))}
                        </Marquee>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
