module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/auth/:path*',
                destination: 'http://localhost:3000/api/auth/[...path]',
            },
        ];
    },
};