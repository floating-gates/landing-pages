<script setup>
import {
  themeColor,
  themeColorOrange,
  themeColorGold,
  themeColorWhite
} from "../config.js";
import processImg from "../data/images/path3.webp";
</script>

<template>
<section class="how-section" id="how_does_it_work">
  <div class="container">
    <!-- 1. Header Section (Centered) -->
    <div class="header-content">
      <h2 class="heading">
        Phases of 
        <span class="accent">Manufactruring Issues</span>
        Discovery
      </h2>
      <p class="section-subheading">
        Identifying manufacturing issues before productions start within the factory relies on three core pillars working in synergy with your CAD libraries:
      </p>
    </div>
    
    <!-- 2. Hero Image (Horizontal Wide) -->
    <div class="image-showcase">
      <img :src="processImg" alt="Gates analysis process diagram" class="process-image" />
    </div>
    
    <!-- 3. Features Grid (Three Columns) -->
    <div class="features-grid">
      <div class="feature-card">
        <h3 class="feature-title">DfM RULES CHECK</h3>
        <p class="feature-body">
          Executes automated checks against a centralized DfM (Design for Manufacturing) Play-book, ensuring every design adheres to specific engineering constraints, tolerances, and standardized best practices without ambiguity.
        </p>
      </div>
      <div class="feature-card">
        <h3 class="feature-title">CAD-AS-GRAPH ANALYSIS</h3>
        <p class="feature-body">
          Attributed Graphs serve as the semantic foundation for CAD & GD&T design review. By mapping individual manufacturing features and more importantly their relationships into a graph structure, the system can algorithmically parse complex geometries that traditional CAD tools alone cannot interpret.
        </p>
      </div>
      <div class="feature-card">
          <h3 class="feature-title">IN NETWORK OPERATIONS</h3>
          <p class="feature-body">
            The software is built in a distributed fashion to look for CAD libraries around the PC/Servers around the factory. All ingestion and parsing occur behind the local firewall. No intellectual property ever leaves the network, maintaining absolute data sovereignty.
          </p>
        </div>
      </div>

      <div class="footer-note">
        <p>THE SOFTWARE IS A BACKGROUND SERVICE THAT CONTINUOUSLY SCANS CAD FILES ACROSS THE FACTORY NETWORK, FLAGS POTENTIAL MANUFACTURING DEFECTS, AND ALERTS A HUMAN OPERATOR BEFORE A FLAWED PART EVER REACHES PRODUCTION.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-section {
  padding: 80px 0;
  background-color: #e3e3e340; 
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-content {
  text-align: center;
}

.section-heading {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 20px;
}

.accent {
  color: v-bind(themeColorOrange);
  font-weight: bold;
}

.section-subheading {
  font-size: 1.1rem;
  margin-bottom: 3rem;
  opacity: 0.8;
}

/* Image Styles for Horizontal Fit */
.image-showcase {
  width: 100%;
  margin-bottom: 30px;
}

.process-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
  /* Optional shadow to make the diagram pop */
  box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
}

/* Column Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 1.5rem;
}

@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  padding: 20px;
  border-top: 4px solid v-bind(themeColorGold);
}

.feature-title {
  font-size: 1.7rem;
  margin-bottom: 10px;
  color: v-bind(themeColor);
  line-height: 1.18;
  letter-spacing: -0.02em;  
  font-weight: 650;
  text-align: center;
}

.feature-body {
  line-height: 1.6;
  opacity: 0.9;
  text-align: justify;
  margin-top: 1rem;
}

.footer-note {
  text-align: center;
  font-style: italic;
  opacity: 0.9;
  padding-top: 1rem;
  border-top: 2px solid #eee;
  width: 100%;
}
</style>
