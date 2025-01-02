---
layout: page
title: Research
permalink: /research/
description: My research is best characterized as practice-informed technical philosophy. This means I study first and foremost the actual practices of technical specialists, in order to discern interesting threads among these practices that underlie particular aspects of the trade. To my way of thinking, this line of work relates to its attended disciplines in pretty much the same ways that a sports/chess pundit's job relates to their respective subject matters.<br>Currently, I am focusing on philosophical, historical, and mathematical questions having to do with set theory, especially descriptive set theory, set theory of the real line, choiceless large cardinals, foundations of mathematics, and mathematical practice. 
nav: false
display_categories: [philosophy, history, mathematical logic]
horizontal: false
---

<!-- pages/research.md -->
<div class="projects">
{%- if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {%- assign categorized_projects = site.research | where: "category", category -%}
  {%- assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.html %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.html %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{%- else -%}
<!-- Display projects without categories -->
  {%- assign sorted_projects = site.research | sort: "importance" -%}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.html %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.html %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
