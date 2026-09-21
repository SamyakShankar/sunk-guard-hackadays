import { events, experiment, metrics, policy, prediction, reservations, resources, workflows } from '../data/mockData'
import type { PolicyMode, Workflow } from '../domain/types'

export interface ControllerApi {
	getOverview: () => Promise<{ events: typeof events; experiment: typeof experiment; metrics: typeof metrics; policy: typeof policy; prediction: typeof prediction; reservations: typeof reservations; resources: typeof resources; workflows: typeof workflows }>
	startWorkflow: (workflow: Workflow) => Promise<{ workflowId: string; accepted: boolean }>
	requestStep: (workflowId: string, step: string) => Promise<{ workflowId: string; step: string; decision: 'queued' | 'granted' }>
	completeStep: (workflowId: string, step: string, usage: { tokens: number }) => Promise<{ workflowId: string; step: string; recorded: boolean }>
	getResourceState: () => Promise<typeof resources>
	getReservationState: () => Promise<typeof reservations>
	getMetrics: () => Promise<typeof metrics>
	getPolicyState: () => Promise<typeof policy>
	setPolicyMode: (mode: PolicyMode) => Promise<{ mode: PolicyMode; applied: boolean }>
}

export const sunkGuardApi: ControllerApi = {
	async getOverview() { return { events, experiment, metrics, policy, prediction, reservations, resources, workflows } },
	async startWorkflow(workflow) { return { workflowId: workflow.id, accepted: true } },
	async requestStep(workflowId, step) { return { workflowId, step, decision: 'queued' } },
	async completeStep(workflowId, step) { return { workflowId, step, recorded: true } },
	async getResourceState() { return resources },
	async getReservationState() { return reservations },
	async getMetrics() { return metrics },
	async getPolicyState() { return policy },
	async setPolicyMode(mode) { return { mode, applied: true } },
}