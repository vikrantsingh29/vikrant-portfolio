import React from 'react'


const ITEMS = [
    {
        date: 'Jan 2025 – Present', title: 'AI/ML Engineer — Petanux GmbH', where: 'Bonn, Germany', points: [
            'Integrated LLMs into chatbot systems; improved accuracy & reduced hallucinations.',
            'Built hybrid-search RAG with ElasticSearch & ChromaDB; optimized latency to near real-time.',
            'Refactored into microservices (Flask/FastAPI); cut pipeline runtime from ~900s to 20–30s.',
        ]
    },
    {
        date: 'Jul 2020 – Sep 2024', title: 'Research Assistant — Fraunhofer FKIE', where: 'Bonn, Germany', points: [
            'LSTM + NAS for trajectory prediction; domain NLP with Transformers.',
            'ETL for wildfire simulation (QGIS, PostGIS, GDAL); dashboards with Power BI.',
        ]
    },
    {
        date: 'Jul 2016 – Mar 2019',
        title: 'Software Developer — Asteria Aerospace',
        where: 'Bengaluru, India',
        points: [
            'Real-time C++ algorithms for UAV telemetry; mission control UIs (Qt/PyQt).',
        ]
    },
    {date: 'Jun 2024', title: 'MS — Universität Paderborn', where: 'Paderborn, Germany', points: []},
    {date: 'Jun 2016', title: 'BE — Panjab University', where: 'Chandigarh, India', points: []},
]


export default function Timeline() {
    return (
        <ol className="relative border-s border-slate-200 dark:border-slate-800">
            {ITEMS.map((it, idx) => (
                <li key={idx} className="ms-6 pb-10">
                    <span
                        className="absolute -start-2.5 mt-1 h-5 w-5 rounded-full bg-brand-600 ring-8 ring-white dark:ring-slate-950"/>
                    <h3 className="text-lg font-semibold">{it.title}</h3>
                    <div className="text-sm opacity-70">{it.date} · {it.where}</div>
                    <ul className="mt-2 list-disc ms-5 text-sm opacity-90 space-y-1">
                        {it.points.map((p, i) => (<li key={i}>{p}</li>))}
                    </ul>
                </li>
            ))}
        </ol>
    )
}