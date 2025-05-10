'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function AccountPage() {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.fullName || '');
      setEmail(user.primaryEmailAddress?.emailAddress || '');
    }
  }, [user]);

  const handleProfileUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingProfile(true);
    console.log("Profile update submitted:", { name });

    try {
      if (user) {
        await user.update({
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' '),
        });
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile.");
    }
    setIsSubmittingProfile(false);
  };

  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (!newPassword) {
      toast.error("New password cannot be empty.");
      return;
    }
    setIsSubmittingPassword(true);
    console.log("Password change submitted for user:", user?.id);

    try {
      if (user) {
        await user.updatePassword({
          currentPassword,
          newPassword,
        });
        toast.success("Password changed successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to change password.");
    }
    setIsSubmittingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  // Determine if user signed up with email/password provider
  const hasPasswordAuth = user?.primaryEmailAddressId !== undefined;

  return (
    <div className="flex flex-col gap-8">
      <header className="mb-0">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your profile, subscription, and security settings.
        </p>
      </header>

      <Card className="bg-white dark:bg-slate-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 dark:text-slate-100">Profile Information</CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-lg">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</Label>
              <Input 
                type="text" 
                name="name" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 dark:bg-slate-700 dark:text-white dark:border-slate-600" 
              />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</Label>
              <Input 
                type="email" 
                name="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 dark:bg-slate-700 dark:text-white dark:border-slate-600" 
                disabled // Email usually not changeable or requires verification
              />
               <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Email cannot be changed after registration for this provider.</p>
            </div>
            <Button type="submit" className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white" disabled={isSubmittingProfile}>
              {isSubmittingProfile ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {hasPasswordAuth && (
        <Card className="bg-white dark:bg-slate-800 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 dark:text-slate-100">Change Password</CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">Update your account password.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-6 max-w-lg">
              <div>
                <Label htmlFor="currentPassword"className="block text-sm font-medium text-slate-700 dark:text-slate-300">Current Password</Label>
                <Input 
                  type="password" 
                  name="currentPassword" 
                  id="currentPassword" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="mt-1 dark:bg-slate-700 dark:text-white dark:border-slate-600" 
                />
              </div>
              <div>
                <Label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300">New Password</Label>
                <Input 
                  type="password" 
                  name="newPassword" 
                  id="newPassword" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="mt-1 dark:bg-slate-700 dark:text-white dark:border-slate-600" 
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm New Password</Label>
                <Input 
                  type="password" 
                  name="confirmPassword" 
                  id="confirmPassword" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 dark:bg-slate-700 dark:text-white dark:border-slate-600" 
                />
              </div>
              <Button type="submit" className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white" disabled={isSubmittingPassword}>
                {isSubmittingPassword ? "Changing..." : "Change Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white dark:bg-slate-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 dark:text-slate-100">Subscription</CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">Manage your current plan and billing.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 dark:text-slate-300">You are currently on the <span className="font-semibold text-sky-600 dark:text-sky-400">Free Plan</span>.</p>
          <Button asChild className="mt-4 bg-amber-500 hover:bg-amber-600 text-white">
            <Link href="/#pricing">Upgrade Plan</Link>
          </Button>
          {/* TODO: Add more subscription management details if applicable */}
        </CardContent>
      </Card>

    </div>
  );
}
