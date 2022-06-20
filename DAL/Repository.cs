using Entities;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace DAL
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        DB_CaptavaleEntities context = null;

        public Repository()
        {
            context = new DB_CaptavaleEntities();
        }

        private DbSet<TEntity> EntitySet
        {
            get
            {
                return context.Set<TEntity>();
            }
        }

        public TEntity Create(TEntity toCreate)
        {
            TEntity result = null;

            try
            {
                EntitySet.Add(toCreate);
                context.SaveChanges();
                result = toCreate;
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            {
                Exception raise = dbEx;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string message = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        // raise a new exception nesting
                        // the current instance as InnerException
                        raise = new InvalidOperationException(message, raise);
                    }
                }
                throw raise;
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }

        public List<T> FilterPager<T, TType>(Expression<Func<TEntity, bool>> where, Expression<Func<TEntity, T>> select, int skip, int take, Expression<Func<TEntity, TType>> orderBy)
        {
            List<T> result;

            result = EntitySet.Where(where).OrderBy(orderBy).Skip(skip).Take(take).Select(select).ToList();

            return result;
        }

        public bool Delete(TEntity toDelete)
        {
            var result = false;

            try
            {
                EntitySet.Attach(toDelete);
                EntitySet.Remove(toDelete);
                result = context.SaveChanges() > 0;
            }
            catch
            {
                throw;
            }

            return result;
        }

        public bool Delete(IEnumerable<TEntity> toDelete)
        {
            var result = false;

            try
            {
                foreach (var item in toDelete)
                {
                    EntitySet.Attach(item);
                    EntitySet.Remove(item);
                }

                result = context.SaveChanges() > 0;
            }
            catch
            {
                throw;
            }

            return result;
        }

        public TEntity Update(TEntity toUpdate, Func<ObservableCollection<TEntity>, TEntity> locatorMap)
        {
            TEntity result = null;

            try
            {
                var entry = context.Entry<TEntity>(toUpdate);

                if (entry.State == EntityState.Detached)
                {
                    if (EntitySet.Local.Count != 0)
                    {
                        TEntity attachedEntity = locatorMap(EntitySet.Local);

                        if (attachedEntity != null)
                        {
                            var attachedEntry = context.Entry(attachedEntity);
                            attachedEntry.CurrentValues.SetValues(toUpdate);
                        }
                        else
                        {
                            entry.State = EntityState.Modified;
                        }
                    }
                    else
                    {
                        entry.State = EntityState.Modified;
                    }
                }
                context.SaveChanges();
                result = toUpdate;
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            {
                Exception raise = dbEx;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string message = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        // raise a new exception nesting
                        // the current instance as InnerException
                        raise = new InvalidOperationException(message, raise);
                    }
                }
                throw raise;
            }
            catch
            {
                throw;
            }

            return result;
        }

        public TEntity Retrieve(Expression<Func<TEntity, bool>> criteria)
        {
            TEntity result = null;

            try
            {
                result = EntitySet.FirstOrDefault(criteria);
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }

        public T Retrieve<T>(Expression<Func<TEntity, bool>> criteria, Expression<Func<TEntity, T>> select)
        {
            T result;

            try
            {
                result = EntitySet.Where(criteria).Select(select).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }

        public T Retrieve<T>(Expression<Func<TEntity, T>> select)
        {
            T result;

            try
            {
                result = EntitySet.Select(select).FirstOrDefault();
            }
            catch
            {
                throw;
            }

            return result;
        }

        public List<T> Filter<T>(Expression<Func<TEntity, bool>> criteria, Expression<Func<TEntity, T>> select)
        {
            List<T> result = null;

            try
            {
                result = EntitySet.Where(criteria).Select(select).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }

        public List<TEntity> Filter(Expression<Func<TEntity, bool>> criteria)
        {
            List<TEntity> result = null;

            try
            {
                result = EntitySet.Where(criteria).ToList();
            }
            catch
            {
                throw;
            }

            return result;
        }

        public List<T> Filter<T>(Expression<Func<TEntity, T>> select)
        {
            List<T> result = null;

            try
            {
                result = EntitySet.Select(select).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }

        public T Max<T>(Expression<Func<TEntity, bool>> criteria, Expression<Func<TEntity, T>> max)
        {
            T result;

            result = EntitySet.Where(criteria).Max(max);

            return result;
        }

        public int Count(Expression<Func<TEntity, bool>> criteria)
        {
            int result;

            result = EntitySet.Where(criteria).Count();

            return result;
        }

        public void Dispose()
        {
            if (context != null)
                context.Dispose();
        }
    }
}
