import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, Timeline, stagger } from 'animejs';
import { MetricsService, OrgMetrics, Member } from './metrics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  @ViewChild('bg') bg!: ElementRef;
  @ViewChild('logo') logo!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('subtitle') subtitle!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;
  @ViewChild('cta') cta!: ElementRef;
  @ViewChild('discordBtn') discordBtn!: ElementRef;
  @ViewChild('donateBtn') donateBtn!: ElementRef;
  @ViewChild('about') about!: ElementRef;
  @ViewChild('stats') stats!: ElementRef;
  @ViewChild('projects') projects!: ElementRef;
  @ViewChild('membersSection') membersSection!: ElementRef;
  @ViewChild('collaborate') collaborate!: ElementRef;

  metrics: OrgMetrics | null = null;
  members: Member[] = [];

  constructor(private metricsService: MetricsService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadMetrics();
    this.loadMembers();
  }

  private loadMetrics() {
    console.log('🔄 Cargando métricas...');
    this.metricsService.getMetrics().subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos del backend:', data);
        this.metrics = data;
        this.cdr.detectChanges(); // <--- ¡Aquí obligamos a Angular a despertar y actualizar la UI!
      },
      error: (err) => {
        console.error('❌ Error fatal conectando al backend:', err);
        this.metrics = {
          total_stars: 0,
          total_contributors: 0,
          active_projects: 0,
          status: 'Offline'
        };
        this.cdr.detectChanges();
      }
    });
  }

  private loadMembers() {
    console.log('🔄 Cargando miembros...');
    this.metricsService.getMembers().subscribe({
      next: (data) => {
        console.log('✅ Miembros recibidos:', data);
        this.members = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('❌ Error cargando miembros:', err)
    });
  }

  ngAfterViewInit() {
    this.initBackground();
    this.animateHero();
    this.setupIntersectionObserver();
  }

  private initBackground() {
    const bgElement = this.bg.nativeElement;
    for (let i = 0; i < 15; i++) {
      const circle = document.createElement('div');
      circle.classList.add('circle');
      const size = Math.random() * 400 + 200;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.left = `${Math.random() * 100}%`;
      circle.style.top = `${Math.random() * 100}%`;
      bgElement.appendChild(circle);
    }

    animate('.circle', {
      translateX: () => (Math.random() - 0.5) * 300,
      translateY: () => (Math.random() - 0.5) * 300,
      duration: () => Math.random() * 10000 + 10000,
      delay: () => Math.random() * 5000,
      loop: true,
      easing: 'easeInOutSine'
    });
  }

  private animateHero() {
    const tl = new Timeline();

    tl
      .add(this.logo.nativeElement, {
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 1000,
        easing: 'easeOutExpo'
      })
      .add(this.title.nativeElement, {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1200,
        easing: 'easeOutExpo'
      }, '-=600')
      .add(this.subtitle.nativeElement, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1200,
        easing: 'easeOutExpo'
      }, '-=900')
      .add(this.heroImage.nativeElement, {
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1500,
        easing: 'easeOutExpo'
      }, '-=1000')
      .add([this.cta.nativeElement, this.discordBtn.nativeElement, this.donateBtn.nativeElement], {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: stagger(100)
      }, '-=800');
  }

  private setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSection(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.about.nativeElement);
    observer.observe(this.stats.nativeElement);
    observer.observe(this.projects.nativeElement);
    observer.observe(this.membersSection.nativeElement);
    observer.observe(this.collaborate.nativeElement);
  }

  private animateSection(target: Element) {
    if (target === this.projects.nativeElement) {
      animate('.project-card', {
        opacity: [0, 1],
        translateY: [40, 0],
        delay: stagger(200),
        duration: 1000,
        easing: 'easeOutExpo'
      });
    } else if (target === this.stats.nativeElement) {
      animate('.stat-card', {
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: stagger(150),
        duration: 1000,
        easing: 'easeOutBack'
      });
    } else if (target === this.membersSection.nativeElement) {
      animate('.member-card', {
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: stagger(150),
        duration: 1000,
        easing: 'easeOutBack'
      });
    } else {
      animate(target, {
        opacity: [0.1, 1],
        translateY: [20, 0],
        duration: 1200,
        easing: 'easeOutExpo'
      });
    }
  }
}
