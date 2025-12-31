'use client'

import { useRouter } from 'next/navigation'
import { Boxes, Puzzle, Plus, FolderKanban } from 'lucide-react'

type ProjectType = 'platform' | 'module'

interface Project {
  id: string
  slug: string
  name: string
  description: string
  status: 'active' | 'draft' | 'archived'
  color: string
  type: ProjectType
  parentId?: string
}

// Données statiques pour le MVP
const projects: Project[] = [
  {
    id: '1',
    slug: 'hub',
    name: 'Hub',
    description: 'Plateforme de dashboards webmarketing',
    status: 'active',
    color: 'indigo',
    type: 'platform',
  },
  {
    id: '2',
    slug: 'ogs',
    name: 'OGS',
    description: 'Suivi des objectifs et KPIs',
    status: 'active',
    color: 'emerald',
    type: 'module',
    parentId: '1',
  },
]

const colorClasses: Record<string, string> = {
  indigo: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
  emerald: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  amber: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
  rose: 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
}

const getParentName = (parentId?: string) => {
  if (!parentId) return null
  const parent = projects.find(p => p.id === parentId)
  return parent?.name || null
}

export default function ProjectsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <FolderKanban className="w-8 h-8 text-indigo-600 dark:text-indigo-500" />
              Mes Projets
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              G&eacute;rez vos projets et suivez leur avancement
            </p>
          </div>
          <button
            disabled
            className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 px-4 py-2.5 rounded-lg font-medium cursor-not-allowed"
            title="Disponible en V2"
          >
            <Plus className="w-5 h-5" />
            Nouveau projet
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const Icon = project.type === 'platform' ? Boxes : Puzzle
            const parentName = getParentName(project.parentId)

            return (
              <button
                key={project.id}
                onClick={() => router.push(`/projects/${project.slug}`)}
                className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-left hover:border-indigo-500/50 hover:shadow-md dark:hover:bg-slate-900 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${colorClasses[project.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  {/* Type badge */}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.type === 'platform'
                      ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400'
                      : 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400'
                  }`}>
                    {project.type === 'platform' ? 'Plateforme' : 'Module'}
                  </span>
                  {/* Parent link for modules */}
                  {parentName && (
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      &rarr; {parentName}
                    </span>
                  )}
                  {/* Status badge */}
                  {project.status === 'active' && (
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                      Actif
                    </span>
                  )}
                </div>
              </button>
            )
          })}

          {/* Placeholder pour nouveau projet */}
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 min-h-[200px]">
            <Plus className="w-8 h-8 mb-2" />
            <span className="text-sm">Nouveau projet</span>
            <span className="text-xs mt-1">(V2)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
