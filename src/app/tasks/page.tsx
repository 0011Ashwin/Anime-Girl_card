"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trophy, CheckCircle, Clock, Zap } from 'lucide-react';
import { useUser } from '@/lib/context/UserContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { initialTasks } from '@/lib/context/UserContext';

export default function TasksPage() {
  const { userData, completeTask, addPoints } = useUser();
  const [uploadCount, setUploadCount] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    // Simulate upload process for multiple files
    setTimeout(() => {
      const fileCount = files.length;
      const points = 50 * fileCount; // 50 points per file
      addPoints(points);
      setUploadCount((prev) => prev + fileCount);
      setUploading(false);

      // Auto-complete upload tasks
      if (!userData.completedTasks.includes(1)) {
        completeTask(1, 0); // First upload
      }
      if (uploadCount + fileCount >= 3 && !userData.completedTasks.includes(3)) {
        completeTask(3, 0); // 3 uploads
      }
    }, 1500);
  };

  const availableTasks = initialTasks.filter(
    (task) => !userData.completedTasks.includes(task.id)
  );
  const completedTasks = initialTasks.filter((task) =>
    userData.completedTasks.includes(task.id)
  );

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-500" />
            Tasks & Challenges
          </h1>
          <p className="text-muted-foreground text-lg">
            Complete tasks to earn points and unlock new characters
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Points', value: userData.points, icon: Zap, color: 'from-yellow-400 to-orange-500' },
            { label: 'Tasks Completed', value: userData.completedTasks.length, icon: CheckCircle, color: 'from-green-400 to-emerald-500' },
            { label: 'Current Level', value: userData.level, icon: Trophy, color: 'from-purple-400 to-pink-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-2">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <Card className="p-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white border-none">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Upload className="w-10 h-10" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Quick File Upload</h2>
                <p className="text-white/90 mb-4">Upload up to 10 files at once to earn 50 points per file!</p>
                <p className="text-sm text-white/70">Files uploaded today: {uploadCount}</p>
              </div>
              <div>
                <label htmlFor="file-upload">
                  <Button
                    disabled={uploading}
                    className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 cursor-pointer"
                    asChild
                  >
                    <span>
                      {uploading ? (
                        <>
                          <Clock className="w-5 h-5 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 mr-2" />
                          Choose Files (Max 10)
                        </>
                      )}
                    </span>
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  max={10}
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Available Tasks */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Tasks</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {availableTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg">{task.title}</h3>
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none">
                          +{task.points} pts
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{task.description}</p>
                      <Badge variant="outline" className="capitalize">
                        {task.type}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {availableTasks.length === 0 && (
            <Card className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">All Tasks Completed!</h3>
              <p className="text-muted-foreground">Great job! Check back later for new challenges.</p>
            </Card>
          )}
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Completed Tasks</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {completedTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-muted/30 opacity-75">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-lg">{task.title}</h3>
                          <Badge variant="secondary">
                            +{task.points} pts
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{task.description}</p>
                        <Badge className="bg-green-500 text-white border-none">
                          Completed ✓
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}