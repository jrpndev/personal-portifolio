import { Component, OnInit } from '@angular/core';
import { PROJECTS, EXPERIENCE, INFRASTRUCTURE_SKILLS } from './portfolio.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: []
})
export class HomeComponent implements OnInit {
  projects = PROJECTS;
  experience = EXPERIENCE;
  infrastructureSkills = INFRASTRUCTURE_SKILLS;

  stats = {
    totalProjects: 6,
    productionSystems: 5,
    platforms: 'Web, Mobile & Bots',
    cloudExperience: 'Cloud & DevOps Experience'
  };

  constructor() { }

  ngOnInit(): void {
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    const scroller = document.querySelector('#dashboard-container') as HTMLElement;
    if (element && scroller) {
      const elementTop = element.offsetTop;
      scroller.scrollTo({
        top: elementTop - 80, // Offset for header
        behavior: 'smooth'
      });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }
}
