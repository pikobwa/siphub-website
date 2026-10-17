const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const scrollTopButton = document.querySelector('.scroll-top-btn');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const setActiveNavLink = () => {
  const sections = document.querySelectorAll('main section[id], footer[id]');
  const offset = window.scrollY + 180;
  let currentId = null;

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = currentId && link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active', Boolean(isActive));
  });
};

if (scrollTopButton) {
  const toggleScrollTopButton = () => {
    scrollTopButton.classList.toggle('visible', window.scrollY > 350);
  };

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleScrollTopButton, { passive: true });
  toggleScrollTopButton();
}

window.addEventListener('scroll', setActiveNavLink, { passive: true });
setActiveNavLink();

const modal = document.getElementById('sponsor-modal');
const openButtons = document.querySelectorAll('[data-open-modal]');
const closeButton = document.querySelector('.modal-close');

const openModal = () => {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
};

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openModal();
  });
});

if (closeButton) {
  closeButton.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
}

const storyModal = document.getElementById('story-modal');
const storyModalTitle = document.getElementById('story-modal-title');
const storyModalBody = document.getElementById('story-modal-body');
const storyCloseButton = document.querySelector('.story-close');
const storyContent = {
  kibera: {
    title: 'From the Shadows of Kibera to the Gates of Strathmore',
    content: `
      <div class="story-modal-visual">
        <img src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80" alt="Students learning together" />
      </div>
      <div class="story-quote">“When opportunity meets support, potential can no longer be ignored.”</div>
      <p>Two neurodivergent students, once excluded by stigma and limited access, began a new chapter through inclusive digital education and mentorship.</p>
      <p>With tailored academic support, life-skills coaching, and practical digital training, they gained the confidence to pursue higher learning and see themselves as capable learners and future professionals.</p>
      <p>Today, their journey reflects what is possible when structured support, community trust, and opportunity come together.</p>
    `,
  },
  life: {
    title: 'More Than Tech: Coaching for Real Life',
    content: `
      <div class="story-modal-visual">
        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80" alt="Young person building work confidence" />
      </div>
      <div class="story-quote">“Real growth happens when skills meet confidence.”</div>
      <p>At SIP Hub, students are not only learning technical tools; they are building confidence, independence, and practical life skills.</p>
      <p>From budgeting to communication, transportation confidence, and self-advocacy, the coaching supports students to thrive in real-world environments beyond the classroom.</p>
      <p>The aim is not just digital literacy, but lasting personal growth that helps young people move into employment, education, and independent living with greater ease.</p>
    `,
  },
};

const openStoryModal = (storyKey) => {
  if (!storyModal || !storyModalTitle || !storyModalBody) return;

  const story = storyContent[storyKey];
  if (!story) return;

  storyModalTitle.textContent = story.title;
  storyModalBody.innerHTML = story.content;
  storyModal.classList.add('open');
  storyModal.setAttribute('aria-hidden', 'false');
};

const closeStoryModal = () => {
  if (!storyModal) return;
  storyModal.classList.remove('open');
  storyModal.setAttribute('aria-hidden', 'true');
};

if (storyCloseButton) {
  storyCloseButton.addEventListener('click', closeStoryModal);
}

if (storyModal) {
  storyModal.addEventListener('click', (event) => {
    if (event.target === storyModal) closeStoryModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && storyModal.classList.contains('open')) {
      closeStoryModal();
    }
  });
}

document.querySelectorAll('.story-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    openStoryModal(link.dataset.story);
  });
});

const sponsorForm = document.getElementById('sponsor-form');
const formStatus = document.querySelector('.form-status');
const successState = document.querySelector('.success-state');
const copyEmailButton = document.querySelector('.copy-email-btn');
const sponsorEmailAddress = 'info@siphub.co.ke';

if (copyEmailButton) {
  copyEmailButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(sponsorEmailAddress);
      copyEmailButton.textContent = 'Email copied';
      copyEmailButton.disabled = true;
    } catch (error) {
      copyEmailButton.textContent = 'Copy unavailable';
    }
  });
}

if (sponsorForm) {
  sponsorForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = sponsorForm.elements.name.value.trim();
    const email = sponsorForm.elements.email.value.trim();
    const organization = sponsorForm.elements.organization.value.trim();
    const phone = sponsorForm.elements.phone.value.trim();
    const message = sponsorForm.elements.message.value.trim();

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.textContent = 'Please complete the required fields before submitting.';
        formStatus.style.color = '#FA2B31';
      }
      return;
    }

    const subject = encodeURIComponent('SIP Hub sponsorship inquiry');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${organization || 'Not provided'}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`
    );

    const mailtoLink = `mailto:${sponsorEmailAddress}?subject=${subject}&body=${body}`;

    sponsorForm.hidden = true;
    if (successState) {
      successState.hidden = false;
    }

    if (formStatus) {
      formStatus.textContent = '';
    }

    sponsorForm.reset();

    setTimeout(() => {
      window.open(mailtoLink, '_blank');
    }, 100);
  });
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const counters = document.querySelectorAll('[data-target]');

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);
  const duration = 1500;
  const startTime = performance.now();

  const update = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    const suffix = target >= 1000 ? '+' : target >= 96 ? '%' : '+';
    counter.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove('active');
    });

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

const theoryNodes = document.querySelectorAll('.theory-node');

if (theoryNodes.length) {
  const activateTheoryNode = (node) => {
    theoryNodes.forEach((item) => item.classList.remove('is-active'));
    node.classList.add('is-active');
  };

  let theoryAutoPlay = true;
  const theoryFlow = document.querySelector('.theory-flow');

  if (theoryFlow) {
    theoryFlow.addEventListener('mouseenter', () => {
      theoryAutoPlay = false;
    });

    theoryFlow.addEventListener('mouseleave', () => {
      theoryAutoPlay = true;
    });
  }

  theoryNodes.forEach((node) => {
    node.addEventListener('click', () => activateTheoryNode(node));
    node.addEventListener('mouseenter', () => activateTheoryNode(node));
    node.addEventListener('focusin', () => activateTheoryNode(node));

    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateTheoryNode(node);
      }
    });
  });

  setInterval(() => {
    if (!theoryAutoPlay || document.hidden) return;

    const activeIndex = [...theoryNodes].findIndex((node) => node.classList.contains('is-active'));
    const nextIndex = activeIndex === theoryNodes.length - 1 ? 0 : activeIndex + 1;
    activateTheoryNode(theoryNodes[nextIndex]);
  }, 2600);
}
