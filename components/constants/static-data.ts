import { CLIENT_SIDE_URL } from "./urls";
import { IoLogoGithub } from "react-icons/io";
import { IoLinkOutline } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";

export const USER_REVIEW_DATA = [
  {
    id: 1,
    author: "Amit Sharma",
    role: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content:
      "Kollaborate has transformed the way my team communicates. Real-time messaging and organized channels make collaboration effortless!",
    ratings: 4,
  },
  {
    id: 2,
    author: "Priya Patel",
    role: "Marketing Manager",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content:
      "The voice channels and video calls work flawlessly. Kollaborate is a must-have for remote teams!",
    ratings: 5,
  },
  {
    id: 3,
    author: "Ravi Verma",
    role: "Freelance Designer",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    content:
      "I love how easy it is to create and manage channels. Perfect for organizing discussions!",
    ratings: 4,
  },
  {
    id: 4,
    author: "Neha Gupta",
    role: "Project Manager",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
    content:
      "Assigning roles and managing permissions is super intuitive. Kollaborate has made teamwork smoother!",
    ratings: 5,
  },
  {
    id: 5,
    author: "Sandeep Reddy",
    role: "Startup Founder",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    content:
      "An all-in-one platform for communication. The UI is clean, and the experience is seamless!",
    ratings: 4,
  },
  {
    id: 6,
    author: "Anjali Mehta",
    role: "HR Specialist",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    content:
      "Managing team communication has never been easier. Kollaborate keeps everything organized!",
    ratings: 5,
  },
  {
    id: 7,
    author: "Vikram Choudhary",
    role: "Data Analyst",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    content:
      "The friend system and enhanced profiles help me stay connected with my colleagues efficiently.",
    ratings: 4,
  },
  {
    id: 8,
    author: "Sneha Iyer",
    role: "Content Creator",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    content:
      "A game-changer for online communities. The organized discussions make everything so smooth!",
    ratings: 5,
  },
  {
    id: 9,
    author: "Arjun Malhotra",
    role: "Tech Blogger",
    avatar: "https://randomuser.me/api/portraits/men/58.jpg",
    content:
      "Kollaborate is the best alternative to other chat platforms. Highly recommend it!",
    ratings: 4,
  },
];

export const USER_AVATARS = [
  {
    id: 1,
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    profileUrl: "https://randomuser.me/api/portraits/men/45",
  },
  {
    id: 2,
    imageUrl: "https://randomuser.me/api/portraits/women/32.jpg",
    profileUrl: "https://randomuser.me/api/portraits/women/32",
  },
  {
    id: 3,
    imageUrl: "https://randomuser.me/api/portraits/men/28.jpg",
    profileUrl: "https://randomuser.me/api/portraits/men/28",
  },
  {
    id: 4,
    imageUrl: "https://randomuser.me/api/portraits/women/41.jpg",
    profileUrl: "https://randomuser.me/api/portraits/women/41",
  },
  {
    id: 5,
    imageUrl: "https://randomuser.me/api/portraits/men/56.jpg",
    profileUrl: "https://randomuser.me/api/portraits/men/56",
  },
  {
    id: 6,
    imageUrl: "https://randomuser.me/api/portraits/women/22.jpg",
    profileUrl: "https://randomuser.me/api/portraits/women/22",
  },
];

export const DEVELOPER_SOCIAL_LINKS = [
  {
    id: 1,
    profile: "Github",
    link: CLIENT_SIDE_URL.SOCIAL_LINKS.GITHUB_PROFILE,
    Icon: IoLogoGithub,
  },
  {
    id: 2,
    profile: "LinkedIn",
    link: CLIENT_SIDE_URL.SOCIAL_LINKS.LINKEDIN_PROFILE,
    Icon: IoLogoLinkedin,
  },
  {
    id: 3,
    profile: "Twitter",
    link: CLIENT_SIDE_URL.SOCIAL_LINKS.TWITTER_PROFILE,
    Icon: RiTwitterXFill,
  },
  {
    id: 4,
    profile: "Portfolio",
    link: CLIENT_SIDE_URL.SOCIAL_LINKS.PORTFOLIO,
    Icon: IoLinkOutline,
  },
];

export const ACCORDION_FAQS = [
  {
    id: 1,
    value: "item-1",
    question: "What is Kollaborate?",
    answer:
      "Kollaborate is a powerful communication and collaboration platform that enables real-time messaging, voice/video calls, and organized discussions through servers and channels.",
  },
  {
    id: 2,
    value: "item-2",
    question: "How does Kollaborate help teams collaborate?",
    answer:
      "Kollaborate allows teams to create dedicated servers, manage roles and permissions, and streamline communication with real-time chat, voice channels, and video calls, ensuring seamless teamwork.",
  },
  {
    id: 3,
    value: "item-3",
    question: "Can I use Kollaborate for personal communication?",
    answer:
      "Yes! Kollaborate is perfect for both personal and professional communication. You can chat with friends, create private groups, or join public communities.",
  },
  {
    id: 4,
    value: "item-4",
    question: "Is Kollaborate free to use?",
    answer:
      "Kollaborate offers a free version with essential features. We also provide premium plans with additional functionalities for businesses and power users.",
  },
  {
    id: 5,
    value: "item-5",
    question: "Does Kollaborate support video conferencing?",
    answer:
      "Yes! Kollaborate allows high-quality video calls for individuals and groups, making remote collaboration more efficient.",
  },
  {
    id: 6,
    value: "item-6",
    question: "Can I create and manage my own server?",
    answer:
      "Absolutely! Kollaborate lets you create, customize, and manage your own server, set up channels, and assign roles to users for better organization.",
  },
  {
    id: 7,
    value: "item-7",
    question:
      "What makes Kollaborate different from other communication platforms?",
    answer:
      "Kollaborate stands out with its intuitive user experience, real-time communication features, seamless integration with other tools, and advanced role management for teams and communities.",
  },
  {
    id: 8,
    value: "item-8",
    question: "Is my data secure on Kollaborate?",
    answer:
      "Yes! We prioritize security and privacy, using end-to-end encryption for messages and secure authentication methods to protect your data.",
  },
  {
    id: 9,
    value: "item-9",
    question: "Can I access Kollaborate on multiple devices?",
    answer:
      "Yes! Kollaborate is available on web, desktop, and mobile, allowing you to stay connected from anywhere.",
  },
];
