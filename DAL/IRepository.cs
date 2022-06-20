using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq.Expressions;

namespace DAL
{
    public interface IRepository<TEntity> : IDisposable where TEntity : class
    {
        TEntity Create(TEntity toCreate);

        bool Delete(TEntity toDelete);

        TEntity Update(TEntity toUpdate, Func<ObservableCollection<TEntity>, TEntity> locatorMap);

        TEntity Retrieve(Expression<Func<TEntity, bool>> criteria);

        T Retrieve<T>(Expression<Func<TEntity, bool>> criteria, Expression<Func<TEntity, T>> select);

        T Retrieve<T>(Expression<Func<TEntity, T>> select);

        List<T> Filter<T>(Expression<Func<TEntity, bool>> criteria, Expression<Func<TEntity, T>> select);

        List<T> Filter<T>(Expression<Func<TEntity, T>> select);

        int Count(Expression<Func<TEntity, bool>> criteria);
    }
}
