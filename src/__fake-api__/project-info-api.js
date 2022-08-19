import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

const now = new Date();

class ProjectInfoApi {
  getProject() {
    return Promise.resolve({
      id: 'GR-2FR43',
      activities: [
        {
          id: 'f66e15066cc6bf1c903f0c81',
          action: 'new_job',
          addedJob: 'Remote React / React Native Developer',
          author: 'Jie Yang Song',
          avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
          date: subDays(subHours(subMinutes(subSeconds(now, 3), 7), 5), 81).getTime()
        },
        {
          id: 'e756e1393b620f87728ab28b',
          action: 'new_job',
          addedJob: 'Senior Golang Backend Engineer',
          author: 'Anika Visser',
          avatar: '/static/mock-images/avatars/avatar-iulia_albu.png',
          date: subDays(subHours(subMinutes(subSeconds(now, 3), 7), 5), 82).getTime()
        },
        {
          id: 'f80b8d4ed2a0ed9099593d39',
          action: 'new_team_member',
          addedMember: 'Omar Darboe',
          author: 'Jie Yang Song',
          avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
          date: subDays(subHours(subMinutes(subSeconds(now, 3), 7), 5), 83).getTime()
        },
        {
          id: '53b48b76b01ed00bddee2038',
          action: 'created',
          author: 'Jie Yang Song',
          avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
          createdCompany: 'Augmastic Inc',
          date: subDays(subHours(subMinutes(subSeconds(now, 3), 7), 5), 84).getTime()
        }
      ],
      assets: [
        {
          id: 'e7626dd2086bf8a7aa6a991d',
          extension: 'pdf',
          fileName: 'Augmastic - White Paper.pdf',
          size: '3 Mb'
        },
        {
          id: '08514371b9d92f92f12c8b0a',
          extension: 'svg',
          fileName: 'Augmastic - White Paper.svg',
          size: '23 Kb'
        }
      ],
      averageRating: 2.5,
      description: `Augmastic is the world’s leading AR technology company, sparking creative and engaging journeys in the real world. Our products inspire outdoor exploration, exercise, and meaningful social interaction. 

 Originally formed at Google in 2011, we became an independent company in 2015 with a strong group of investors including Nintendo, The Pokémon Company, and Alsop Louie Partners. 

Niantic is an Equal Opportunity and Affirmative Action employer. We believe that cultivating a workplace where our people are supported and included is essential to creating great products our community will love. 

Our mission emphasizes seeking and hiring diverse voices, including those who are traditionally underrepresented in the technology industry, and we consider this to be one of the most important values we hold close. We're a hard-working, fun, and exciting group who value intellectual curiosity and a passion for problem-solving! We have growing offices located in San Francisco, Sunnyvale, Bellevue, Los Angeles, Tokyo, Hamburg, London, and Zurich.`,
      employees: '50-100',
      founders: [
        {
          id: '5e8883f7ed1486d665d8be1e',
          avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
          name: 'Jie Yang Song',
          role: 'CEO & Co-founder'
        },
        {
          id: '5e887b209c28ac3dd97f6db5',
          avatar: '/static/mock-images/avatars/avatar-fran_perez.png',
          name: 'Fran Perez',
          role: 'CTO & Co-founder'
        },
        {
          id: 'd058d861d43bbb36fb73b0bc',
          avatar: '/static/mock-images/avatars/avatar-omar_darboe.png',
          name: 'Omar Darboe',
          role: 'CFO'
        }
      ],
      images: [
        '/static/mock-images/jobs/company_gallery_1.jpg',
        '/static/mock-images/jobs/company_gallery_2.jpg',
        '/static/mock-images/jobs/company_gallery_3.jpg',
        '/static/mock-images/jobs/company_gallery_4.jpg',
        '/static/mock-images/jobs/company_gallery_5.jpg',
        '/static/mock-images/jobs/company_gallery_6.jpg'
      ],
      isVerified: true,
      jobs: [
        {
          id: '560a3dfd48c1602f4ff5d6ac',
          currency: '$',
          isRemote: true,
          publishedAt: subMinutes(now, 24).getTime(),
          salaryMax: '75k',
          salaryMin: '55k',
          title: 'Remote React / React Native Developer'
        },
        {
          id: '6681e0dbfab15e83498b0d10',
          city: 'Munich',
          country: 'Germany',
          currency: '$',
          publishedAt: subHours(now, 2).getTime(),
          salaryMax: '160k',
          salaryMin: '80k',
          title: 'Senior Golang Backend Engineer'
        }
      ],
      locations: ['New York City', 'Milano', 'Moscow'],
      logo: '/static/mock-images/jobs/company-logo_1.svg',
      members: [
        {
          id: '5e8883f7ed1486d665d8be1e',
          avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
          name: 'Jie Yang Song',
          role: 'CEO & Co-founder',
          skillSet: ['JavaScript', 'React', 'Go']
        },
        {
          id: '5e887b209c28ac3dd97f6db5',
          avatar: '/static/mock-images/avatars/avatar-fran_perez.png',
          name: 'Fran Perez',
          role: 'CTO & Co-founder',
          skillSet: ['C', 'C++', 'Java']
        },
        {
          id: 'd058d861d43bbb36fb73b0bc',
          avatar: '/static/mock_images/avatars/avatar-omar_darboe.png',
          name: 'Omar Darboe',
          role: 'CFO',
          skillSet: ['Go', 'Python']
        }
      ],
      name: 'Project Information',
      reviews: [
        {
          id: 'ab8ed24cd579605c386e1275',
          author: 'Anika Visser',
          avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
          createdAt: subDays(subHours(subMinutes(subSeconds(now, 4), 9), 4), 80).getTime(),
          description: 'I have been working with this company full-time. Great for the work life balance. Cons, decentralized decision making process across the organization.',
          rating: 3.8,
          title: 'Great company, providing an awesome & easy to use product'
        },
        {
          id: '973a87618e946f08ea8d8491',
          author: 'Victor Plesoianu',
          createdAt: subDays(subHours(subMinutes(subSeconds(now, 4), 9), 4), 80).getTime(),
          description: 'Every day you learn something new - that is a typical day at work in Augmastic. I am surrounded by supportive people, from different cultures, we have a strong and unified team and help each other whenever is needed. The most enjoyable part of the job is that you meet new people, experts on different disciplines that might help you in your work, but the hardest part of the job is that there are too many tools and systems to use.',
          rating: 3.4,
          title: 'Friendly environment'
        },
        {
          id: '7fdf64061aba2fd67d732006',
          author: 'Victor Plesoianu',
          createdAt: subDays(subHours(subMinutes(subSeconds(now, 4), 9), 4), 70).getTime(),
          description: 'I have been working with this company full-time. Great for the work life balance. Cons, decentralized decision making process across the organization.',
          rating: 3.8,
          title: 'Great company, providing an awesome & easy to use product'
        }
      ],
      shortDescription: 'Building technologies and ideas that move us as the leaders in Augmented Reality',
      website: 'https://augmastic.dev'
    });
  }

  getProjectInfo() {
    return Promise.resolve({
      "STACKS": {
        title: "Stacks",
        logo: 'https://cryptologos.cc/logos/stacks-stx-logo.png?v=022',
        symbol: "STX",
        shortDescription: 'Stacks is a layer-1 blockchain solution that is designed to bring smart contracts and decentralized applications (DApps) to Bitcoin (BTC). These smart contracts are brought to Bitcoin without changing any of the features that make it so powerful — including its security and stability.',
        description: `These DApps are open and modular, meaning developers can build on top of each other's apps to produce features that are simply not possible in a regular app. Since Stacks uses Bitcoin as a base layer, everything that happens on the network is settled on the most widely used arguably the most secure blockchain in operation — Bitcoin.

The platform is powered by the Stacks token (STX), which is used for fueling the execution of smart contracts, processing transactions and registering new digital assets on the Stacks 2.0 blockchain.

The platform was formerly known as Blockstack, but was rebranded to Stacks in Q4 2020 in order to "separate the ecosystem and open source project from Blockstack PBC" — the company that built the original protocols.

The mainnet for Stacks 2.0 launched in January 2021.`,
        tags: ["DeFi", "NFT", "BTC"],
        links: {
          website: "https://stacks.co",
          github: "https://github.com/stacks-network",
          discord: "https://discord.com/invite/5DJaBrf",
          twitter: "https://twitter.com/Stacks",
          telegram: "https://t.me/StacksChat",
          reddit: "https://www.reddit.com/r/stacks/",
        }
      }
    });
  }
}

export const projectInfoApi = new ProjectInfoApi();
