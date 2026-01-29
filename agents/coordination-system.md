# Agent Coordination System

## Agent Hierarchy & Roles

### Web Project Manager (Primary Orchestrator)
- **Authority**: Final decision maker on priorities and scope
- **Reports To**: Project Owner (You)
- **Manages**: All sub-agents and external contributors
- **Key Function**: Strategic oversight and resource coordination

### Web App Developer (Technical Lead)
- **Authority**: Technical architecture and implementation decisions
- **Reports To**: Web Project Manager
- **Specializes In**: React/Next.js, vanilla JS, serverless deployment
- **Key Function**: Build and maintain the technical foundation

### Future Agents (As Needed)
- **Customer Service Agent**: Website visitor interaction
- **Content Agent**: Copy writing and content strategy
- **Design Agent**: UI/UX and visual design
- **SEO Agent**: Search optimization and analytics

## Communication Protocols

### Daily Workflow
```
1. Project Manager reviews progress and sets daily priorities
2. Developer receives task assignments with technical requirements
3. Developer provides status updates and technical recommendations
4. Project Manager coordinates with other agents based on developer feedback
5. All agents report blockers immediately
```

### Task Assignment Flow
```
Project Manager → Task Definition → Developer Assessment → Implementation Plan → Execution
```

### Escalation Path
```
Blocker Identified → Immediate Report → Project Manager Decision → Resource Reallocation
```

## File Structure & Organization

### Agent Documentation
```
/agents/
  ├── web-project-manager.md    # Strategic oversight specs
  ├── web-app-developer.md      # Technical implementation specs
  ├── coordination-system.md    # This file
  └── future-agents/           # Placeholder for expansion
```

### Project Communication
```
/project-docs/
  ├── current-tasks.md         # Active work items
  ├── decisions-log.md         # Key decisions and rationale
  ├── asset-inventory.md       # Content and resource tracking
  └── milestone-tracker.md     # Progress against goals
```

## Integration Points

### GitHub Workflow
- All agents work through GitHub issues and project boards
- Project Manager creates and assigns issues
- Developer implements and creates pull requests
- Automated deployment triggers on merge

### Serverless Considerations
- Project Manager plans for Office Forms integration timeline
- Developer architects for future AI agent backend needs
- Coordination system scales with serverless function additions

### Future Expansion
- Customer Service Agent will integrate with existing coordination
- New agents inherit communication protocols
- Project Manager maintains authority over all additions

## Success Metrics
- **Velocity**: Tasks completed per sprint/week
- **Quality**: Issues found in production vs development
- **Coordination**: Time from task assignment to completion
- **Technical Debt**: Vanilla JS fallback coverage maintained