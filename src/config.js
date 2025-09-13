export const SITE = {
    name: 'Vikrant Singh',
    role: 'AI/ML Engineer & Software Developer',
    headline: 'Building innovative AI-driven solutions with 7+ years of experience',
    subhead: "AI/ML Engineer with expertise in LLMs, RAG systems, and scalable backend architectures. Passionate about creating intelligent systems that solve real-world problems.",
    email: 'singhvikrant29@gmail.com',
    phone: '+49-15906343533',
    location: 'Bonn, Germany',
    socials: {
        github: 'https://github.com/vikrantsingh29',
        linkedin: 'https://linkedin.com/in/vikrantsingh29'
    },
}


export const PROJECTS = [
    {
        slug: 'thesis-knowledge-graph-embeddings',
        title: 'Master Thesis — Knowledge Graph Embeddings',
        description: 'Developed function-based KGE with Neural Architecture Search to improve accuracy and reduce LLM hallucinations by integrating structured knowledge.',
        stack: ['PyTorch', 'NAS', 'Knowledge Graphs', 'LLMs'],
        image: '/assets/thesis.jpg',
    },
    {
        slug: 'step-counting-sensor-data',
        title: 'Step Counting with Sensor Data',
        description: 'Processed raw IMU data with Butterworth filtering and peak detection. Achieved lowest error with GRU model (MSE ≈ 3.68) for accurate left-right step counting.',
        stack: ['Python', 'PyTorch', 'LSTM', 'GRU', 'Random Forest', 'XGBoost'],
        image: '/assets/steps.jpg',
    },
    {
        slug: 'email-rag-langgraph',
        title: 'RAG with LangGraph on Email Data',
        description: 'Implemented RAG pipeline using LangGraph for contextual querying of personal email data with applications in automated drafting and intelligent search.',
        stack: ['LangGraph', 'Flask', 'RAG', 'Python'],
        image: '/assets/rag.jpg',
    },
    {
        slug: 'financial-markets-strategy',
        title: 'Financial Market Investment Strategies',
        description: 'Developed predictive models using LSTM and Prophet for crypto/stock markets. Integrated Yahoo Finance & Bloomberg APIs with Quantlib for derivatives pricing.',
        stack: ['Prophet', 'Quantlib', 'TensorFlow', 'LSTM', 'Bloomberg API'],
        image: '/assets/finance.jpg',
    },
    {
        slug: 'cycling-tour-prediction',
        title: 'Cycling Tour Prediction',
        description: 'Designed NLP pipeline with Hugging Face NER and Facebook BART for zero-shot classification. Integrated geospatial filtering for cycling route recommendations.',
        stack: ['Hugging Face', 'BART', 'NLP', 'Geospatial Analysis', 'Python'],
        image: '/assets/cycling.jpg',
    },
]


export const SKILLS = {
    'Programming Languages': ['Python', 'C++', 'Java', 'SQL'],
    'AI/ML & LLMs': ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'LangGraph', 'Autogen', 'RAG', 'NAS', 'Transformers'],
    'Backend & APIs': ['Flask', 'FastAPI', 'REST APIs', 'Microservices', 'RabbitMQ', 'Redis'],
    'Data Engineering': ['ETL', 'dbt', 'Azure Data Services', 'Pandas', 'NumPy'],
    'Web Scraping': ['Playwright', 'Scrapy', 'Selenium', 'httpx'],
    'Data Visualization': ['Matplotlib', 'Seaborn', 'Plotly', 'Power BI', 'Grafana'],
    'Databases': ['MySQL', 'PostgreSQL', 'ChromaDB', 'ElasticSearch', 'Snowflake'],
    'Cloud & DevOps': ['Azure', 'Docker', 'Git', 'Prometheus', 'Loki', 'Sentry'],
    'Geospatial': ['QGIS', 'PostGIS', 'GDAL'],
    'Other Tools': ['Jupyter', 'n8n', 'Agile/Scrum']
}


export const WORK_EXPERIENCE = [
    {
        year: 'Jan 2025 – Present',
        title: 'AI/ML Engineer',
        company: 'Petanux GmbH',
        location: 'Bonn, Germany',
        description: 'Incorporates LLMs into chatbot systems, builds RAG pipelines with ElasticSearch & ChromaDB. Develops AI agents using LangChain/LangGraph. Refactored backend to microservices, reducing pipeline runtime from ~900s to 20-30s.',
        responsibilities: [
            'Incorporated LLMs into chatbot systems, improving accuracy, reducing hallucinations, and mitigating prompt injection vulnerabilities.',
            'Enhanced chatbot performance by optimizing retrieval workflows and reducing response latency to near real-time.',
            'Built and optimized RAG pipelines with ElasticSearch & ChromaDB for hybrid search, streamlining ingestion and retrieval.',
            'Developed AI agents (e.g., kiosk ordering, trading, router agents) using LangChain, LangGraph, Autogen, and function calling.',
            'Refactored backend into microservices with Flask/FastAPI and REST APIs, using async workflows and semaphores to reduce pipeline runtime from ~900s to 20–30s.',
            'Implemented scalable solutions: Redis-based real-time video player, RabbitMQ for orchestration, and Elastic-based hybrid DB migration.',
            'Integrated monitoring stack with Grafana, Prometheus, Loki, Sentry to improve observability and reliability.',
            'Designed scalable web scrapers with Playwright, Scrapy, Selenium, and httpx; automated pipelines using n8n.',
            'Contributed to computer vision tasks (object detection & segmentation) using PyTorch and TensorFlow.'
        ],
        techStack: ['Python', 'LLMs', 'RAG', 'ElasticSearch', 'ChromaDB', 'LangChain', 'LangGraph', 'Flask', 'FastAPI', 'Redis', 'RabbitMQ', 'Grafana', 'Prometheus', 'PyTorch', 'TensorFlow']
    },
    {
        year: 'Jul 2020 – Sep 2024',
        title: 'Research Assistant',
        company: 'Fraunhofer Institute for Communication, Information Processing and Ergonomics',
        location: 'Bonn, Germany',
        description: 'Optimized flight trajectory predictions with LSTM + NAS. Applied Transformer models for NLP. Built ETL pipelines for wildfire simulations using QGIS, PostGIS, GDAL.',
        responsibilities: [
            'Optimized flight trajectory predictions by integrating LSTM with NAS, and implemented HMM with Viterbi Algorithm on OpenSky data.',
            'Applied Transformer models for domain-specific NLP applications.',
            'Built ETL pipelines for wildfire simulations using QGIS, PostGIS, GDAL; created Power BI dashboards for ML outputs.',
            'Deployed Liferay portal in Docker, improving operational efficiency.',
            'Collaborated across teams, simplifying technical insights for non-technical stakeholders.'
        ],
        techStack: ['Python', 'LSTM', 'NAS', 'Transformers', 'NLP', 'QGIS', 'PostGIS', 'GDAL', 'Power BI', 'Docker', 'Liferay']
    },
    {
        year: 'Jul 2016 – Mar 2019',
        title: 'Software Developer',
        company: 'Asteria Aerospace Pvt. Ltd.',
        location: 'Bengaluru, India',
        description: 'Developed real-time C++ algorithms for UAV telemetry. Implemented data visualization with Qt & PyQt. Trained clients including Indian police & defense on mission software.',
        responsibilities: [
            'Developed real-time C++ algorithms for UAV telemetry, improving flight performance and safety.',
            'Implemented data visualization with Qt & PyQt, enhancing mission control usability.',
            'Integrated geospatial datasets to strengthen UAV mission planning and control.',
            'Trained clients including Indian police & defense on mission software, and mentored new hires.'
        ],
        techStack: ['C++', 'Qt', 'PyQt', 'UAV Systems', 'Geospatial Data', 'Real-time Systems']
    },
    {
        year: 'Jan 2016 – Jun 2016',
        title: 'Android Developer Intern',
        company: 'Bison Code LLP',
        location: 'Chandigarh, India',
        description: 'Developed "Safe Shelter" app prototype with geofencing technology for community safety.',
        responsibilities: [
            'Developed "Safe Shelter" app prototype with geofencing technology for community safety.'
        ],
        techStack: ['Android', 'Java', 'Geofencing', 'Mobile Development']
    },
]


export const EDUCATION = [
    {
        year: 'Jun 2024',
        title: 'MS in Computer Science',
        institution: 'Universität Paderborn',
        location: 'Paderborn, Germany',
        description: 'Master thesis on Knowledge Graph Embeddings with Prof. Dr. Axel-Cyrille Ngonga Ngomo. Focused on function-based embeddings and Neural Architecture Search.',
        gpa: '1.7 (German Scale)',
    },
    {
        year: 'Jun 2016',
        title: 'BE in Information Technology',
        institution: 'Panjab University',
        location: 'Chandigarh, India',
        description: 'Bachelor\'s degree in Information Technology with strong foundation in algorithms and software development.',
        gpa: 'First Class',
    },
]

// Keep the old TIMELINE for backward compatibility but mark as deprecated
export const TIMELINE = WORK_EXPERIENCE
