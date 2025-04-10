import { ApiResponse } from '../types/api';

export const mockApiResponseEn: ApiResponse = {
  success: true,
  data: {
    hero: {
      title: "Unforgettable Experiences",
      subtitle: "Discover unique adventures in the heart of Canadian wilderness",
      ctaText: "Explore",
      backgroundImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    services: {
      title: "Our Packages",
      subtitle: "Choose the perfect wilderness experience for your adventure",
      items: [
        {
          id: 1,
          title: "Hunting",
          description: "Experience guided hunting tours with professional guides in pristine wilderness.",
          image: "https://images.unsplash.com/photo-1519058082350-08283be95172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          packageName: "Package 1"
        },
        {
          id: 2,
          title: "Fishing",
          description: "Catch trophy-sized fish in our private lakes with premium equipment provided.",
          image: "https://images.unsplash.com/photo-1516548113915-7297fcb4a0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
          packageName: "Package 2"
        },
        {
          id: 3,
          title: "Wilderness Stay",
          description: "Live the complete wilderness experience with comfortable accommodation and gourmet meals.",
          image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          packageName: "Package 3"
        }
      ]
    },
    calendar: {
      title: "Check Availability",
      subtitle: "Plan your adventure by checking our availability calendar",
      occupiedDates: [
        "2025-01-28",
        "2025-01-29",
        "2025-02-04"
      ],
      months: [
        {
          name: "January",
          year: 2025
        },
        {
          name: "February",
          year: 2025
        }
      ]
    },
    map: {
      title: "Our Locations",
      subtitle: "Explore our exclusive hunting and fishing territories",
      locations: [
        {
          id: 1,
          name: "Pourvoirie Lake",
          coordinates: {
            x: 25,
            y: 40
          },
          description: "Our main lodge with premium accommodation and lake access."
        },
        {
          id: 2,
          name: "Mountain Retreat",
          coordinates: {
            x: 75,
            y: 60
          },
          description: "Remote hunting cabin with spectacular mountain views."
        }
      ]
    },
    testimonials: {
      title: "What Our Guests Say",
      items: [
        {
          id: 1,
          text: "The fishing experience was incredible. I caught the biggest trout of my life!",
          author: "John Smith",
          hashtag: "BASIC"
        },
        {
          id: 2,
          text: "Professional guides, comfortable lodging, and an authentic wilderness experience.",
          author: "Emily Johnson",
          hashtag: "BASIC"
        },
        {
          id: 3,
          text: "My third time here and it gets better every year. The staff is exceptional.",
          author: "Michael Brown",
          hashtag: "BASIC"
        },
        {
          id: 4,
          text: "An unforgettable family adventure. We'll definitely be coming back!",
          author: "Sarah Wilson",
          hashtag: "BASIC"
        }
      ]
    },
    contact: {
      title: "Contact Us",
      subtitle: "Have questions or ready to book your adventure? Reach out to us!",
      formLabels: {
        name: "Your Name",
        email: "Email Address",
        message: "Your Message",
        file: "Attach Files (PDF only)",
        submit: "Send Message"
      },
      successMessage: "Your message has been sent successfully. We'll get back to you soon!",
      errorMessage: "There was an error sending your message. Please try again."
    },
    footer: {
      address: "123 Wilderness Road, Quebec, Canada, G0A 1V0",
      phone: "+1 (555) 123-4567",
      email: "info@pourvoirie.example.com",
      menuItems: [
        {
          id: 1,
          text: "Home",
          url: "/"
        },
        {
          id: 2,
          text: "About Us",
          url: "/about"
        },
        {
          id: 3,
          text: "Services",
          url: "/services"
        },
        {
          id: 4,
          text: "Gallery",
          url: "/gallery"
        },
        {
          id: 5,
          text: "Blog",
          url: "/blog"
        },
        {
          id: 6,
          text: "Contact",
          url: "/contact"
        }
      ]
    },
    header: {
      menuItems: [
        {
          id: 1,
          text: "Home",
          url: "/"
        },
        {
          id: 2,
          text: "Packages",
          url: "/packages"
        },
        {
          id: 3,
          text: "Gallery",
          url: "/gallery"
        },
        {
          id: 4,
          text: "About",
          url: "/about"
        },
        {
          id: 5,
          text: "Contact",
          url: "/contact"
        }
      ]
    }
  }
};

export const mockApiResponseFr: ApiResponse = {
  success: true,
  data: {
    hero: {
      title: "Des expériences inoubliables",
      subtitle: "Découvrez des aventures uniques au cœur de la nature canadienne",
      ctaText: "Explorer",
      backgroundImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    services: {
      title: "Nos Forfaits",
      subtitle: "Choisissez l'expérience parfaite pour votre aventure en pleine nature",
      items: [
        {
          id: 1,
          title: "Chasse",
          description: "Profitez de tours de chasse guidés avec des guides professionnels dans une nature préservée.",
          image: "https://images.unsplash.com/photo-1519058082350-08283be95172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          packageName: "Forfait 1"
        },
        {
          id: 2,
          title: "Pêche",
          description: "Attrapez des poissons de taille trophée dans nos lacs privés avec équipement premium fourni.",
          image: "https://images.unsplash.com/photo-1516548113915-7297fcb4a0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
          packageName: "Forfait 2"
        },
        {
          id: 3,
          title: "Séjour Nature",
          description: "Vivez l'expérience complète de la nature avec un hébergement confortable et des repas gastronomiques.",
          image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          packageName: "Forfait 3"
        }
      ]
    },
    calendar: {
      title: "Vérifiez la Disponibilité",
      subtitle: "Planifiez votre aventure en vérifiant notre calendrier de disponibilité",
      occupiedDates: [
        "2025-01-28",
        "2025-01-29",
        "2025-02-04"
      ],
      months: [
        {
          name: "January",
          year: 2025
        },
        {
          name: "February",
          year: 2025
        }
      ]
    },
    map: {
      title: "Nos Emplacements",
      subtitle: "Explorez nos territoires exclusifs de chasse et de pêche",
      locations: [
        {
          id: 1,
          name: "Lac Pourvoirie",
          coordinates: {
            x: 25,
            y: 40
          },
          description: "Notre pavillon principal avec hébergement premium et accès au lac."
        },
        {
          id: 2,
          name: "Retraite Montagne",
          coordinates: {
            x: 75,
            y: 60
          },
          description: "Cabane de chasse isolée avec des vues spectaculaires sur la montagne."
        }
      ]
    },
    testimonials: {
      title: "Ce Que Disent Nos Invités",
      items: [
        {
          id: 1,
          text: "L'expérience de pêche était incroyable. J'ai attrapé la plus grosse truite de ma vie!",
          author: "Jean Dupont",
          hashtag: "BASIC"
        },
        {
          id: 2,
          text: "Guides professionnels, hébergement confortable et une expérience authentique en pleine nature.",
          author: "Marie Leclerc",
          hashtag: "BASIC"
        },
        {
          id: 3,
          text: "Ma troisième fois ici et ça s'améliore chaque année. Le personnel est exceptionnel.",
          author: "Michel Tremblay",
          hashtag: "BASIC"
        },
        {
          id: 4,
          text: "Une aventure familiale inoubliable. Nous reviendrons certainement!",
          author: "Sophie Lavoie",
          hashtag: "BASIC"
        }
      ]
    },
    contact: {
      title: "Contactez-Nous",
      subtitle: "Vous avez des questions ou êtes prêt à réserver votre aventure? Contactez-nous!",
      formLabels: {
        name: "Votre Nom",
        email: "Adresse Email",
        message: "Votre Message",
        file: "Joindre des Fichiers (PDF uniquement)",
        submit: "Envoyer le Message"
      },
      successMessage: "Votre message a été envoyé avec succès. Nous vous répondrons bientôt!",
      errorMessage: "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer."
    },
    footer: {
      address: "123 Chemin Sauvage, Québec, Canada, G0A 1V0",
      phone: "+1 (555) 123-4567",
      email: "info@pourvoirie.example.com",
      menuItems: [
        {
          id: 1,
          text: "Accueil",
          url: "/"
        },
        {
          id: 2,
          text: "À Propos",
          url: "/about"
        },
        {
          id: 3,
          text: "Services",
          url: "/services"
        },
        {
          id: 4,
          text: "Galerie",
          url: "/gallery"
        },
        {
          id: 5,
          text: "Blog",
          url: "/blog"
        },
        {
          id: 6,
          text: "Contact",
          url: "/contact"
        }
      ]
    },
    header: {
      menuItems: [
        {
          id: 1,
          text: "Accueil",
          url: "/"
        },
        {
          id: 2,
          text: "Forfaits",
          url: "/packages"
        },
        {
          id: 3,
          text: "Galerie",
          url: "/gallery"
        },
        {
          id: 4,
          text: "À Propos",
          url: "/about"
        },
        {
          id: 5,
          text: "Contact",
          url: "/contact"
        }
      ]
    }
  }
}; 