'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectTypesTab from './_tabs/ProjectTypesTab';
import ServiceCategoriesTab from './_tabs/ServiceCategoriesTab';
import ServicesTab from './_tabs/ServicesTab';

const ProjectManagementPage = () => {
  const [activeTab, setActiveTab] = useState('project-types');

  return (
    <div>
      <Navbar title="Project Management" />
      
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="project-types">Project Types</TabsTrigger>
            <TabsTrigger value="service-categories">Categories</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="project-types">
            <ProjectTypesTab />
          </TabsContent>

          <TabsContent value="service-categories">
            <ServiceCategoriesTab />
          </TabsContent>

          <TabsContent value="services">
            <ServicesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectManagementPage;
