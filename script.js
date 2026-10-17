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
const openButtons = document.querySelectorAll('[data-open-modal="sponsor-modal"]');
const closeButtons = document.querySelectorAll('[data-close-modal]');
const sponsorForm = document.getElementById('sponsor-form');
const successState = document.querySelector('.success-state');
const formStatus = document.querySelector('.form-status');
const submitCooldownMs = 10000;
const lastSubmitKey = 'siphub-last-submit';

const resetSponsorModalState = () => {
  if (sponsorForm) {
    sponsorForm.hidden = false;
    sponsorForm.style.display = 'grid';
  }

  if (successState) {
    successState.hidden = true;
    successState.style.display = 'none';
  }

  if (formStatus) {
    formStatus.textContent = '';
    formStatus.style.color = '#111827';
  }
};

const openModal = () => {
  if (!modal) return;
  resetSponsorModalState();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  resetSponsorModalState();
};

const closeTargetModal = (modalId) => {
  const targetModal = document.getElementById(modalId);
  if (!targetModal) return;
  targetModal.classList.remove('open');
  targetModal.setAttribute('aria-hidden', 'true');
};

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openModal();
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closeTargetModal(button.dataset.closeModal);
  });
});

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
        <img src="assets/university college.jpg" alt="University college students and campus life" />
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
        <img src="assets/upgrading.jpg" alt="Young person building work confidence" />
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
  sponsorForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = sponsorForm.elements.name.value.trim();
    const email = sponsorForm.elements.email.value.trim();
    const organization = sponsorForm.elements.organization.value.trim();
    const phone = sponsorForm.elements.phone.value.trim();
    const message = sponsorForm.elements.message.value.trim();
    const botCheck = sponsorForm.elements.botcheck.value.trim();
    const websiteField = sponsorForm.elements.website.value.trim();
    const lastSubmitTime = Number(localStorage.getItem(lastSubmitKey) || 0);
    const now = Date.now();

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.textContent = 'Please complete the required fields before submitting.';
        formStatus.style.color = '#FA2B31';
      }
      return;
    }

    if (botCheck || websiteField) {
      if (formStatus) {
        formStatus.textContent = 'Submission blocked by security checks.';
        formStatus.style.color = '#FA2B31';
      }
      return;
    }

    if (lastSubmitTime && now - lastSubmitTime < submitCooldownMs) {
      if (formStatus) {
        formStatus.textContent = 'Please wait a moment before sending another message.';
        formStatus.style.color = '#FA2B31';
      }
      return;
    }

    const formData = new FormData(sponsorForm);
    formData.set('name', name);
    formData.set('email', email);
    formData.set('organization', organization);
    formData.set('phone', phone);
    formData.set('message', message);

    if (formStatus) {
      formStatus.textContent = 'Sending...';
      formStatus.style.color = '#111827';
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Submission failed');
      }

      localStorage.setItem(lastSubmitKey, String(Date.now()));

      if (sponsorForm) {
        sponsorForm.hidden = true;
        sponsorForm.style.display = 'none';
      }

      if (successState) {
        successState.hidden = false;
        successState.style.display = 'grid';
      }

      if (formStatus) {
        formStatus.textContent = '';
      }

      sponsorForm.reset();
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = 'Your message could not be sent right now. Please email hello@siphub.org.';
        formStatus.style.color = '#FA2B31';
      }
    }
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
