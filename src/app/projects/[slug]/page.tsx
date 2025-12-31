'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Target, Users, Building2, ListChecks, Calendar,
  BookOpen, Bot, FileText, Link as LinkIcon,
  Boxes, Puzzle
} from 'lucide-react'
import { cn } from '@/lib/utils'

type ProjectType = 'platform' | 'module'

interface ProjectData {
  name: string
  description: string
  type: ProjectType
  parentSlug?: string
  parentName?: string
}

// Données statiques pour le MVP
const projectsData: Record<string, ProjectData> = {
  hub: {
    name: 'Hub',
    description: 'Plateforme de dashboards webmarketing',
    type: 'platform',
  },
  ogs: {
    name: 'OGS',
    description: 'Suivi des objectifs et KPIs',
    type: 'module',
    parentSlug: 'hub',
    parentName: 'Hub',
  },
}

const tabs = [
  { id: 'objectifs', label: 'Objectifs', icon: Target },
  { id: 'roles', label: 'R\u00f4les', icon: Users },
  { id: 'architecture', label: 'Architecture', icon: Building2 },
  { id: 'features', label: 'Fonctionnalit\u00e9s', icon: ListChecks },
  { id: 'roadmap', label: 'Roadmap', icon: Calendar },
  { id: 'notice', label: 'Notice', icon: BookOpen },
  { id: 'agents', label: 'Agents IA', icon: Bot },
  { id: 'changelog', label: 'Changelog', icon: FileText },
  { id: 'liens', label: 'Liens', icon: LinkIcon },
]

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [activeTab, setActiveTab] = useState('objectifs')

  const project = projectsData[slug]

  if (!project) {
    router.push('/projects')
    return null
  }

  const TypeIcon = project.type === 'platform' ? Boxes : Puzzle

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Project Header */}
      <div className="bg-white dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 mb-1">
            <TypeIcon className={cn(
              'w-5 h-5',
              project.type === 'platform' ? 'text-indigo-500' : 'text-purple-500'
            )} />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{project.name}</h1>
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full',
              project.type === 'platform'
                ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400'
                : 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400'
            )}>
              {project.type === 'platform' ? 'Plateforme' : 'Module'}
            </span>
            {project.parentName && (
              <button
                onClick={() => router.push(`/projects/${project.parentSlug}`)}
                className="text-xs text-slate-400 hover:text-indigo-500 transition-colors"
              >
                &rarr; {project.parentName}
              </button>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{project.description}</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-800 sticky top-[57px] z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all',
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <TabContent tabId={activeTab} projectSlug={slug} />
      </div>
    </div>
  )
}

function TabContent({ tabId, projectSlug }: { tabId: string; projectSlug: string }) {
  // Contenu placeholder pour chaque onglet
  const content: Record<string, { title: string; description: string }> = {
    objectifs: {
      title: 'Objectifs',
      description: 'D\u00e9finissez le probl\u00e8me, la solution et les objectifs cl\u00e9s du projet.',
    },
    roles: {
      title: 'R\u00f4les',
      description: 'Swimlane des acteurs et responsabilit\u00e9s.',
    },
    architecture: {
      title: 'Architecture',
      description: 'Stack technique, sch\u00e9mas et choix technologiques.',
    },
    features: {
      title: 'Fonctionnalit\u00e9s',
      description: 'Liste des features \u00e0 int\u00e9grer.',
    },
    roadmap: {
      title: 'Roadmap',
      description: 'R\u00e9troplanning, versioning et jalons.',
    },
    notice: {
      title: 'Notice',
      description: 'Documentation utilisateur de l\'outil.',
    },
    agents: {
      title: 'Agents IA',
      description: 'Configuration des agents IA du projet.',
    },
    changelog: {
      title: 'Changelog',
      description: 'Historique des modifications.',
    },
    liens: {
      title: 'Liens',
      description: 'Ressources et liens utiles.',
    },
  }

  const tab = content[tabId] || { title: 'Onglet', description: '' }

  return (
    <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{tab.title}</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6">{tab.description}</p>

      {/* Placeholder content */}
      <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-12 text-center">
        <p className="text-slate-400 dark:text-slate-500">
          Contenu markdown &agrave; venir...
        </p>
        <p className="text-sm text-slate-300 dark:text-slate-600 mt-2">
          (Projet: {projectSlug} / Onglet: {tabId})
        </p>
      </div>
    </div>
  )
}
