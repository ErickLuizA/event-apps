import { IRepository } from "../types/repository"

interface IRepositoryItemProps {
  repository:IRepository
}

export function RepositoryItem({ repository }: IRepositoryItemProps) {
	return (
		<li>
			<strong>{repository.name}</strong>
			<p>{repository.description}</p>
			<a href={repository.html_url} target="_blank">
				Acessar repositório
			</a>
		</li>
	)
}
