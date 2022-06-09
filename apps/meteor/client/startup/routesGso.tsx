// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, {lazy} from 'react'

import { appLayout } from '../lib/appLayout';
import MainLayout from '../views/root/MainLayout';

const BlogViewPage = lazy(() => import('../views/blog/BlogView'));
const GamesViewPage = lazy(() => import('../views/games/GamesView'));
const ProductsViewPage = lazy(() => import('../views/products/ProductsView'));
const StoreViewPage = lazy(() => import('../views/store/StoreView'));
const MessagesViewPage = lazy(() => import('../views/messages/MessagesView'));
const SelectRoleViewPage = lazy(() => import('../views/roles/SelectRoleView'));
const RoleResultViewPage = lazy(() => import('../views/roles/components/RoleResult'));
const BlogDetailPageView = lazy(() => import('../views/blog/BlogDetail'));
const GameDetailPageView = lazy(() => import('../views/games/SingleGameDetails'));
const ProductDetailPageView = lazy(() => import('../views/products/SIngleProductDetails'));


// New Routes for GSO app

FlowRouter.route('/blogs', {
	name: 'blogs',
	action: () => {
		appLayout.render(<MainLayout><BlogViewPage /></MainLayout>);
	},
});

FlowRouter.route('/games', {
	name: 'games',
	action: () => {
		appLayout.render(<MainLayout><GamesViewPage /></MainLayout>);
	},
});

FlowRouter.route('/products', {
	name: 'products',
	action: () => {
		appLayout.render(<MainLayout><ProductsViewPage /></MainLayout>);
	},
});

FlowRouter.route('/store', {
	name: 'store',
	action: () => {
		appLayout.render(<MainLayout><StoreViewPage /></MainLayout>);
	},
});

FlowRouter.route('/messages', {
	name: 'messages',
	action: () => {
		appLayout.render(<MainLayout><MessagesViewPage /></MainLayout>);
	},
});

FlowRouter.route('/select-role', {
	name: 'select-role',
	action: () => {
		appLayout.render(<MainLayout><SelectRoleViewPage /></MainLayout>);
	},
});

FlowRouter.route('/role-result', {
	name: 'role-result',
	action: () => {
		appLayout.render(<MainLayout><RoleResultViewPage /></MainLayout>);
	},
});

FlowRouter.route('/blog/detail/:id', {
	name: 'blog-detail',
	action: () => {
		appLayout.render(<MainLayout><BlogDetailPageView /></MainLayout>);
	},
});

FlowRouter.route('/games/detail/:id', {
	name: 'games-detail',
	action: () => {
		appLayout.render(<MainLayout><GameDetailPageView /></MainLayout>);
	},
});

FlowRouter.route('/products/detail/:id', {
	name: 'products-detail',
	action: () => {
		appLayout.render(<MainLayout><ProductDetailPageView /></MainLayout>);
	},
});
