import { useEffect, useState } from 'react'
import { RepositoryItem } from './RepositoryItem'
import '../styles/repositories.scss'
import { IRepository } from '../types/repository'

const getRepositories = () => {
	return fetch('https://api.github.com/orgs/rocketseat/repos').then(response =>
		response.json()
	)
}

export function RepositoryList() {
	const [repositories, setRepositories] = useState<IRepository[]>([])

	useEffect(() => {
		getRepositories()
			.then(repos => setRepositories(repos))
			.catch(err => console.log(err))
	}, [])

	return (
		<section className="repository-list">
			<h1>Lista de repositórios</h1>

			<ul>
				{repositories.map(repository => (
					<RepositoryItem
						key={repository.id}
						repository={repository}
					/>
				))}
			</ul>
		</section>
	)
}
