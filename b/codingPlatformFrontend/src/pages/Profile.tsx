
import { useState } from 'react';
import { User, Badge as UserBadge } from '../types/user';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Calendar, CheckCircle, Edit, Github, Globe, Linkedin, Mail, PieChart, Twitter, User as UserIcon } from 'lucide-react';

// Mock user data
const mockUser: User = {
  id: 'user1',
  username: 'codesparker',
  email: 'john.doe@example.com',
  displayName: 'John Doe',
  bio: 'Software engineer passionate about algorithms and data structures. Always looking to improve my problem-solving skills.',
  avatarUrl: '',
  createdAt: '2023-01-15',
  stats: {
    totalSolved: 42,
    totalSubmissions: 87,
    streak: 12,
    rank: 256,
    points: 1240,
    easyProblems: 25,
    mediumProblems: 14,
    hardProblems: 3,
    expertProblems: 0
  },
  badges: [
    {
      id: 'badge1',
      name: 'First Blood',
      description: 'Solved your first problem',
      icon: 'trophy',
      rarity: 'common',
      earnedAt: '2023-01-16'
    },
    {
      id: 'badge2',
      name: 'Streak Master',
      description: 'Maintained a 7-day problem-solving streak',
      icon: 'fire',
      rarity: 'rare',
      earnedAt: '2023-02-10'
    },
    {
      id: 'badge3',
      name: 'Speed Demon',
      description: 'Solved a hard problem in less than 10 minutes',
      icon: 'lightning',
      rarity: 'epic',
      earnedAt: '2023-03-05'
    }
  ],
  socials: {
    github: 'johndoe',
    twitter: 'johndoe',
    linkedin: 'john-doe',
    website: 'https://johndoe.com'
  }
};

const Profile = () => {
  const [user] = useState<User>(mockUser);

  const getBadgeColorsByRarity = (rarity: UserBadge['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'bg-blue-500/20 text-blue-500';
      case 'rare':
        return 'bg-purple-500/20 text-purple-500';
      case 'epic':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'legendary':
        return 'bg-gradient-to-r from-primary to-secondary text-white';
      default:
        return 'bg-blue-500/20 text-blue-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-16 max-w-7xl mx-auto">
      {/* Profile header */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/30 to-secondary/30"></div>
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex-shrink-0 -mt-16 md:-mt-20">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.displayName}
                className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-card object-cover"
              />
            ) : (
              <div className="h-24 w-24 md:h-32 md:w-32 rounded-full flex items-center justify-center bg-muted text-2xl font-bold border-4 border-card">
                {getInitials(user.displayName)}
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{user.displayName}</h1>
                <p className="text-muted-foreground mt-1">@{user.username}</p>
              </div>
              
              <Button variant="outline" className="mt-4 md:mt-0">
                <Edit className="h-4 w-4 mr-2" />
                <span>Edit Profile</span>
              </Button>
            </div>
            
            {user.bio && (
              <p className="mt-4 text-foreground/90 max-w-2xl">{user.bio}</p>
            )}
            
            <div className="mt-4 flex flex-wrap gap-4">
              {user.socials?.github && (
                <a href={`https://github.com/${user.socials.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-4 w-4" />
                  <span>{user.socials.github}</span>
                </a>
              )}
              
              {user.socials?.twitter && (
                <a href={`https://twitter.com/${user.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-4 w-4" />
                  <span>{user.socials.twitter}</span>
                </a>
              )}
              
              {user.socials?.linkedin && (
                <a href={`https://linkedin.com/in/${user.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-4 w-4" />
                  <span>{user.socials.linkedin}</span>
                </a>
              )}
              
              {user.socials?.website && (
                <a href={user.socials.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Globe className="h-4 w-4" />
                  <span>Website</span>
                </a>
              )}
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Problems Solved</p>
              <h3 className="text-2xl font-bold">{user.stats.totalSolved}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <PieChart className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Success Rate</p>
              <h3 className="text-2xl font-bold">{Math.round((user.stats.totalSolved / user.stats.totalSubmissions) * 100)}%</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Current Streak</p>
              <h3 className="text-2xl font-bold">{user.stats.streak} days</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Global Rank</p>
              <h3 className="text-2xl font-bold">#{user.stats.rank}</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs with content */}
      <Tabs defaultValue="progress" className="mt-8">
        <TabsList className="bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress" className="mt-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Problem Solving Progress</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Easy</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{user.stats.easyProblems} solved</span>
                </div>
                <Progress value={user.stats.easyProblems} className="h-2 bg-muted" indicatorColor="bg-green-500" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Medium</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{user.stats.mediumProblems} solved</span>
                </div>
                <Progress value={user.stats.mediumProblems} max={50} className="h-2 bg-muted" indicatorColor="bg-yellow-500" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Hard</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{user.stats.hardProblems} solved</span>
                </div>
                <Progress value={user.stats.hardProblems} max={30} className="h-2 bg-muted" indicatorColor="bg-red-500" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                    <span>Expert</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{user.stats.expertProblems} solved</span>
                </div>
                <Progress value={user.stats.expertProblems} max={20} className="h-2 bg-muted" indicatorColor="bg-purple-500" />
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <a href="/problems">Continue Solving</a>
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="badges" className="mt-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Earned Badges</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.badges.map((badge) => (
                <div key={badge.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center",
                      getBadgeColorsByRarity(badge.rarity)
                    )}>
                      {badge.icon === 'trophy' && <span className="text-xl">🏆</span>}
                      {badge.icon === 'fire' && <span className="text-xl">🔥</span>}
                      {badge.icon === 'lightning' && <span className="text-xl">⚡</span>}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{badge.name}</h4>
                        <Badge variant="outline" className={cn(
                          "text-xs capitalize",
                          badge.rarity === 'common' && "border-blue-500/50 text-blue-500",
                          badge.rarity === 'rare' && "border-purple-500/50 text-purple-500",
                          badge.rarity === 'epic' && "border-yellow-500/50 text-yellow-500",
                          badge.rarity === 'legendary' && "border-primary/50 text-primary"
                        )}>
                          {badge.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    Earned on {formatDate(badge.earnedAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
