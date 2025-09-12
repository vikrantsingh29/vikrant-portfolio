# Cycling Tour Prediction

## Overview

Designed an intelligent NLP pipeline for cycling route recommendations using advanced natural language processing and geospatial analysis. The system processes user queries to provide distance and elevation-aware cycling route suggestions.

## Technical Implementation

### NLP Pipeline
- **Named Entity Recognition**: Implemented using Hugging Face NER models to extract location entities from user queries
- **Zero-Shot Classification**: Utilized Facebook BART model for classifying query intents without requiring training data
- **Query Understanding**: Built robust text processing to handle various forms of cycling-related requests

### Geospatial Integration
- **Location Processing**: Integrated geopy library for accurate geocoding and location resolution
- **Distance Calculations**: Implemented haversine formula for precise distance measurements between locations
- **Elevation Analysis**: Incorporated elevation data for route difficulty assessment and preference matching

### Key Features
- Natural language query processing for cycling routes
- Intelligent location extraction and validation
- Distance and elevation-aware filtering
- Real-time route recommendation engine
- Support for multiple query formats and languages

## Technical Stack

- **NLP**: Hugging Face Transformers, Facebook BART
- **Geospatial**: geopy, geospatial analysis libraries
- **Backend**: Python, FastAPI/Flask
- **Data Processing**: Pandas, NumPy

## Impact

The system enables users to find optimal cycling routes through natural language queries, considering both distance preferences and elevation profiles for better route matching based on rider capabilities and preferences.
