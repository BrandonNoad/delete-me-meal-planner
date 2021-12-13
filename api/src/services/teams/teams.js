import { db } from 'src/lib/db';

export const teams = () => {
    return db.team.findMany();
};

export const Team = {
    teamMembers: (_obj, { root }) => db.team.findMany({ where: { id: root.id } }).teamMembers(),
    recipes: (_obj, { root }) => db.team.findMany({ where: { id: root.id } }).recipes()
};
